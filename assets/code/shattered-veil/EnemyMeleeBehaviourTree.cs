public class EnemyMeleeBehaviourTree : BehaviourTree
{
    Animator enemyAnimator;
    GameObject player;
    NavMeshAgent agent;
    EnemyAIStats enemyMeele;
    public override void StartEnemyBehabiour()
    {
        base.StartEnemyBehabiour();

        myBlackBoard = new BlackBoard();
        player = GameObject.FindGameObjectWithTag("Player");
        agent = GetComponent<NavMeshAgent>();
        enemyMeele = GetComponent<EnemyAIStats>();
        enemyAnimator = GetComponentInChildren<Animator>();

        myRootNode =
            new Sequence(new List<BehaviourNode>
            {
                new IsStuned(new List<BehaviourNode>()),

                new Selector(new List<BehaviourNode>
                    {
                        new CanSeePlayer(new List<BehaviourNode>()),
                        new Patrol(new List<BehaviourNode>())
                    }),
                new ChasePlayer(new List<BehaviourNode>()),
                new AttackPlayer(new List<BehaviourNode>()),
            });

        myBlackBoard.data.Add("PlayerGameObject", player);
        myBlackBoard.data.Add("ThisEnemyTransform", transform);
        myBlackBoard.data.Add("EnemyAgent", agent);
        myBlackBoard.data.Add("EnemyMeele", enemyMeele);
        myBlackBoard.data.Add("EnemyAnimator", enemyAnimator);

        myRootNode.PopulateBlackBoard(myBlackBoard);
    }

    void Update()
    {
        UpdateTree();
        enemyAnimator.SetFloat("Speed", agent.velocity.magnitude / agent.speed);
    }
}
