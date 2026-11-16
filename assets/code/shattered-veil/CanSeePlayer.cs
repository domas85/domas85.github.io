public class CanSeePlayer : BehaviourNode
{
    public CanSeePlayer(List<BehaviourNode> someChildren) : base(someChildren)
    {

    }

    float timer = 0f;

    public override ReturnState Evaluate()
    {
        GameObject player = myBlackBoard.data["PlayerGameObject"] as GameObject;
        Transform enemyTransform = myBlackBoard.data["ThisEnemyTransform"] as Transform;
        NavMeshAgent agent = myBlackBoard.data["EnemyAgent"] as NavMeshAgent;
        EnemyAIStats enemy = myBlackBoard.data["EnemyMeele"] as EnemyAIStats;

        if (myBlackBoard.data.TryGetValue("StoppingDistance", out object value))
        {
            agent.stoppingDistance = float.Parse(value.ToString());
        }

        if (player != null)
        {
            float distanceToPlayer = Vector3.Distance(enemyTransform.position, player.transform.position);
            if (distanceToPlayer < enemy.SightDistance)
            {
                Vector3 targetDirection = player.transform.position - enemyTransform.position - (Vector3.up * enemy.EyeHeight);
                float angleToPlayer = Vector3.Angle(targetDirection, enemy.transform.forward);

                if (angleToPlayer >= -enemy.FielOfView && angleToPlayer <= enemy.FielOfView)
                {
                    Ray ray = new Ray(enemyTransform.position + (Vector3.up * enemy.EyeHeight), targetDirection);
                    RaycastHit hitInfo = new RaycastHit();

                    if (Physics.Raycast(ray, out hitInfo, enemy.SightDistance))
                    {
                        if (hitInfo.transform.gameObject == player)
                        {
                            RotateEnemyToPlayer(enemy, player);

                            Debug.DrawRay(ray.origin, ray.direction * enemy.SightDistance);
                            timer = 0f;
                            return ReturnState.Success;
                        }
                        else if (timer < enemy.LooseSightTime)
                        {
                            RotateEnemyToPlayer(enemy, player);

                            Debug.DrawRay(ray.origin, ray.direction * enemy.SightDistance);
                            timer += Time.deltaTime;
                            return ReturnState.Success;
                        }
                    }
                }
                else if (timer < enemy.LooseSightTime)
                {
                    RotateEnemyToPlayer(enemy, player);

                    timer += Time.deltaTime;
                    return ReturnState.Success;
                }
            }
            else if (timer < enemy.LooseSightTime)
            {
                RotateEnemyToPlayer(enemy, player);

                timer += Time.deltaTime;
                return ReturnState.Success;
            }
            else
            {
                myBlackBoard.data["PlayerOutOfSight"] = true;
                return ReturnState.Failure;
            }
        }

        myBlackBoard.data["PlayerOutOfSight"] = false;
        return ReturnState.Failure;
    }

    public void RotateEnemyToPlayer(EnemyAIStats enemy, GameObject player)
    {
        Quaternion targetRotation = Quaternion.LookRotation(new Vector3(player.transform.position.x - enemy.transform.position.x, 0, player.transform.position.z - enemy.transform.position.z), Vector3.up);
        enemy.transform.rotation = Quaternion.Slerp(enemy.transform.rotation, targetRotation, Time.deltaTime * enemy.RotationSpeed);

    }
}
