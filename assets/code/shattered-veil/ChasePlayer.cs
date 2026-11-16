public class ChasePlayer : BehaviourNode
{
    private EventInstance walkSoundInstance;
    private bool isWalking = false;


    public ChasePlayer(List<BehaviourNode> someChildren) : base(someChildren)
    {
        walkSoundInstance = RuntimeManager.CreateInstance("event:/SFX/Enemy_WalkRun");

        EnemyAIStats.OnStopEnemySound += StopEnemySound;
    }

    float newDestinationCoolDown = 0.5f;

    public override ReturnState Evaluate()
    {
        GameObject player = myBlackBoard.data["PlayerGameObject"] as GameObject;
        NavMeshAgent agent = myBlackBoard.data["EnemyAgent"] as NavMeshAgent;
        Animator enemyAnim = myBlackBoard.data["EnemyAnimator"] as Animator;


        if (player != null)
        {
            if (newDestinationCoolDown <= 0)
            {
                newDestinationCoolDown = 0.5f;
                agent.SetDestination(player.transform.position);

                if (!isWalking && myBlackBoard.data.ContainsKey("PlayerOutOfSight"))
                {
                    walkSoundInstance.start();
                    isWalking = true;
                }
            }
            newDestinationCoolDown -= Time.deltaTime;

            if (myBlackBoard.data.ContainsKey("PlayerOutOfSight") && (bool)myBlackBoard.data["PlayerOutOfSight"])
            {
                StopEnemySound();

            }

            return ReturnState.Success;
        }
        else
        {
            StopEnemySound();
            return ReturnState.Failure;
        }
    }
    public void StopEnemySound()
    {
        if (isWalking)
        {
            walkSoundInstance.stop(FMOD.Studio.STOP_MODE.ALLOWFADEOUT);
            isWalking = false;
        }
    }

    ~ChasePlayer()
    {
        EnemyAIStats.OnStopEnemySound -= StopEnemySound;
    }
}
