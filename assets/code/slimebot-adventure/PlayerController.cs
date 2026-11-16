public enum MovementType { NewestNewMovement, NewMovement, OldMovement }

[RequireComponent(typeof(Rigidbody))]
public class PlayerController : MonoBehaviour
{
    public static float GlobalGravity = -9.81f;
    public float GravityScale = 1.8f;
    public MovementType PlayerMovementType;
    public float PlayerSpeed = 10;
    public float PlayerTurnSpeed = 25;
    public bool PlayerCanJump = false;
    public float JumpForce = 12;
    public Transform RotationPoint;
    public PlayerInputs PlayerControls;
    public float CoyoteTime = 0.2f;
    public float JumpBufferTime = 0.2f;
    public float RayLenght = 1.7f;
    public bool HoverThePlayer = true;
    public float SpringStrength = 139;
    public float SpringDamper = 10;
    public float RideHeight = 1.6f;

    private Vector3 forward;
    private Vector3 right;
    private float coyoteTimeCounter;
    private float jumpBufferCounter;
    private Rigidbody playerRB;
    private Vector3 playerInput;
    private Vector3 mousePosition;
    private bool isGounded = false;
    private InputAction moveInput;
    private InputAction JumpInput;
    private InputAction InteractInput;
    private InputAction SuccInput;
    private InputAction SprayInput;
    private LayerMask platformLayer;
    private Vector3 lastPlayerPosition;
    private PlayerSoundController playerSoundController;
    Vector3 previousTransform;
    Vector3 platformVelocity;

    private void Awake()
    {
        playerSoundController = GetComponent<PlayerSoundController>();
        platformLayer = LayerMask.GetMask("MovingPlatform");
        PlayerControls = new PlayerInputs();
    }

    private void OnEnable()
    {
        moveInput = PlayerControls.Player.Move;
        moveInput.Enable();

        JumpInput = PlayerControls.Player.Jump;
        JumpInput.Enable();
        JumpInput.performed += PlayerJump;

        InteractInput = PlayerControls.Player.Interact;
        InteractInput.Enable();
        InteractInput.performed += InteractWith;

        SuccInput = PlayerControls.Player.Succ;
        SuccInput.Enable();

        SprayInput = PlayerControls.Player.Fire;
        SprayInput.Enable();
    }

    void InteractWith(InputAction.CallbackContext context)
    {
        if (SprayInput.IsPressed() || SuccInput.IsPressed())
        {
            Debug.Log("spray is pressed");
            return;
        }
        if (!SprayInput.IsPressed() || !SuccInput.IsPressed())
        {
            Collider[] colliderArray = Physics.OverlapSphere(transform.position, 4f);
            foreach (Collider collider in colliderArray)
            {
                if (collider.gameObject.CompareTag("Interactable"))
                {
                    if (Physics.Linecast(collider.gameObject.transform.position, transform.position, LayerMask.GetMask("Default")))
                    {
                        Debug.Log("There is something between the interactable and the player");
                    }
                    else
                    {
                        Debug.Log("Player interacted with the object");
                        var interactable = collider.gameObject.GetComponent<IInteractable>();
                        if (interactable != null)
                        {
                            interactable.Interact();
                        }

                    }
                }
            }
        }
    }

    private void OnDisable()
    {
        moveInput.Disable();
        JumpInput.Disable();
        InteractInput.Disable();
        SuccInput.Disable();
        SprayInput.Disable();
    }

    private void Start()
    {
        playerRB = GetComponent<Rigidbody>();
        playerRB.useGravity = false;

        forward = Camera.main.transform.forward;
        forward.y = 0f;
        forward = Vector3.Normalize(forward);
        right = Quaternion.Euler(new Vector3(0, 90, 0)) * forward;
    }

    void GetInput()
    {
        playerInput = moveInput.ReadValue<Vector2>();
    }

    void MovePlayer()
    {
        //New movemnt
        switch (PlayerMovementType)
        {
            case MovementType.NewestNewMovement:
                Vector3 newMovement = new Vector3(playerInput.y, 0, playerInput.x * -1) * PlayerSpeed * Time.deltaTime;

                transform.position += newMovement;

                break;
            case MovementType.NewMovement:
                Vector3 movement = new Vector3(playerInput.x, 0, playerInput.y) * PlayerSpeed * Time.deltaTime;

                transform.position += movement;

                break;
            case MovementType.OldMovement:
                Vector3 rightMovement = playerInput.x * right * PlayerSpeed * Time.deltaTime;
                Vector3 upMovement = playerInput.y * forward * PlayerSpeed * Time.deltaTime;

                Vector3 heading = Vector3.Normalize(rightMovement + upMovement);

                //transform.forward = heading;
                transform.position += rightMovement;
                transform.position += upMovement;

                break;
        }
    }

    void PlayerRotation()
    {
        mousePosition = Input.mousePosition;

        Ray cameraRay = Camera.main.ScreenPointToRay(mousePosition);
        Plane groundPlane = new Plane(Vector3.up, RotationPoint.position);
        float rayLenght;

        if (groundPlane.Raycast(cameraRay, out rayLenght))
        {
            Vector3 pointToLook = cameraRay.GetPoint(rayLenght);

            //transform.forward = new Vector3(pointToLook.x - transform.position.x, 0, pointToLook.z - transform.position.z);

            Quaternion targetRotation = Quaternion.LookRotation(new Vector3(pointToLook.x - transform.position.x, 0, pointToLook.z - transform.position.z), Vector3.up);

            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, Time.deltaTime * PlayerTurnSpeed);
        }
    }

    void PlayerJump(InputAction.CallbackContext context)
    {
        jumpBufferCounter = JumpBufferTime;

        coyoteTimeCounter = 0f;
    }

    void Update()
    {
        if (GameManager.Instance.IsPaused) return;

        if (Input.anyKey)
        {
            GetInput();
        }
        PlayerRotation();
    }

    void FixedUpdate()
    {
        if(GameManager.Instance.IsPaused) return;

        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.down), out RaycastHit platformRay, 5f, platformLayer))
        {
            if (previousTransform != Vector3.zero && previousTransform != platformRay.transform.position)
            {
                platformVelocity = platformRay.transform.position - previousTransform;
            }

            previousTransform = platformRay.transform.position;

            if (platformVelocity != null)
            {
                transform.position += platformVelocity;
            }
        }
        else
        {
            previousTransform = Vector3.zero;
        }

        if (moveInput.IsPressed())
        {
            MovePlayer();
            playerSoundController.PlayerAudioSouce.enabled = true;

        }
        else
        {
            playerSoundController.PlayerAudioSouce.enabled = false;

        }

        Vector3 gravity = GlobalGravity * GravityScale * Vector3.up;
        playerRB.AddForce(gravity, ForceMode.Acceleration);

        if (lastPlayerPosition.y <= transform.position.y)
        {
            SpringStrength = 1000;
        }
        else
        {
            SpringStrength = 150;
        }
        lastPlayerPosition = transform.position;

        Vector3 otherVel = Vector3.zero;
        Vector3 vel = playerRB.velocity;

        Debug.DrawLine(transform.position, transform.position + new Vector3(0, -RayLenght, 0), Color.red);
        Debug.DrawLine(transform.position, transform.position + new Vector3(0, -RideHeight, 0), Color.blue);
        Debug.DrawLine(transform.position, transform.position + vel, Color.white);

        if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.down), out RaycastHit rayHit, RayLenght))
        {
            if (rayHit.collider.CompareTag("DefaultGround"))
            {
                playerSoundController.PlayFootstepSound(playerSoundController.DefaultWalkSound);
                playerSoundController.PlayerAudioSouce.volume = 0.8f;
            }
            if (HoverThePlayer)
            {
                HoverPlayer(rayHit);
            }
            isGounded = true;
            playerRB.velocity = Vector3.zero;
        }
        else
        {
            isGounded = false;
        }

        jumpBufferCounter -= Time.deltaTime;

        if (PlayerCanJump && coyoteTimeCounter > 0f && jumpBufferCounter > 0f)
        {
            playerRB.AddForce(Vector3.up * JumpForce, ForceMode.Impulse);

            jumpBufferCounter = 0f;
        }

        if (PlayerCanJump && isGounded)
        {
            coyoteTimeCounter = CoyoteTime;
        }
        else
        {
            coyoteTimeCounter -= Time.deltaTime;
        }
    }

    void HoverPlayer(RaycastHit rayHit)
    {
        Vector3 vel = playerRB.velocity;
        Vector3 rayDir = transform.TransformDirection(transform.TransformDirection(Vector3.down));

        Vector3 otherVel = Vector3.zero;
        Rigidbody hitBody = rayHit.rigidbody;
        if (hitBody != null)
        {
            otherVel = hitBody.velocity;
        }

        float rayDirVel = Vector3.Dot(rayDir, vel);
        float otherDirVel = Vector3.Dot(rayDir, otherVel);

        float relVel = rayDirVel - otherDirVel;

        float x = rayHit.distance - RideHeight;

        float springForce = (x * SpringStrength) - (relVel * SpringDamper);

        playerRB.AddForce(rayDir * springForce);
    }
}
