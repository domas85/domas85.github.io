public class MovementAnimationController : MonoBehaviour
{
    public Animator animator;
    public PlayerController controller;

    PlayerInputs playerInput;
    Vector2 currentMovementInput;
    Vector3 currentMovement;
    bool isMovementPressed;

    private Vector3 forward;
    private Vector3 right;
    private void Awake()
    {
        playerInput = new PlayerInputs();

        playerInput.Player.Move.started += OnMovementInput;
        playerInput.Player.Move.canceled += OnMovementInput;
        playerInput.Player.Move.performed += OnMovementInput;
    }
    private void Start()
    {
        forward = Camera.main.transform.forward;
        forward.y = 0f;
        forward = Vector3.Normalize(forward);
        right = Quaternion.Euler(new Vector3(0, 90, 0)) * forward;
    }

    void OnMovementInput(InputAction.CallbackContext context)
    {
        currentMovementInput = context.ReadValue<Vector2>();
        currentMovement.x = currentMovementInput.x;
        currentMovement.z = currentMovementInput.y;
        isMovementPressed = currentMovementInput.x != 0 || currentMovementInput.y != 0;
    }

    private void Update()
    {
        if (GameManager.Instance.IsPaused)
        {
            animator.speed = 0f;
            return;
        }
        else
        {
            animator.speed = 1f;
        }

        HandleWalkAnimations();
        HandleAnimation();
        HandleWaterGunAnimation();
    }

    void HandleWalkAnimations()
    {
        switch (controller.PlayerMovementType)
        {
            case MovementType.NewestNewMovement:

                float newNewVerticalz = Vector3.Dot(currentMovement, transform.forward);
                float newNewHorizontalx = Vector3.Dot(currentMovement, transform.right);

                animator.SetFloat("velocityZ", newNewHorizontalx * -1, 0.1f, Time.deltaTime);
                animator.SetFloat("velocityX", newNewVerticalz, 0.1f, Time.deltaTime);
                break;
            case MovementType.NewMovement:

                float newVerticalz = Vector3.Dot(currentMovement, transform.forward);
                float newHorizontalx = Vector3.Dot(currentMovement, transform.right);

                animator.SetFloat("velocityZ", newVerticalz, 0.1f, Time.deltaTime);
                animator.SetFloat("velocityX", newHorizontalx, 0.1f, Time.deltaTime);
                break;
            case MovementType.OldMovement:

                Vector3 rightMovement = currentMovement.x * right;
                Vector3 upMovement = currentMovement.z * forward;

                var movement = upMovement + rightMovement;

                float verticalz = Vector3.Dot(movement, transform.forward);
                float horizontalx = Vector3.Dot(movement, transform.right);

                animator.SetFloat("velocityZ", verticalz, 0.1f, Time.deltaTime);
                animator.SetFloat("velocityX", horizontalx, 0.1f, Time.deltaTime);
                break;
        }
    }

    void HandleInteractAnimation(InputAction.CallbackContext context)
    {
        if (animator.GetCurrentAnimatorStateInfo(0).IsName("Interaction_State") && animator.GetCurrentAnimatorStateInfo(0).normalizedTime <= 1f)
        {
            Debug.Log("animation is running");
        }
        else if(!playerInput.Player.Succ.IsPressed() && !playerInput.Player.Fire.IsPressed())
        {
            animator.SetTrigger("Interacted");
        }
    }

    void HandleWaterGunAnimation()
    {
        if (playerInput.Player.Succ.IsPressed() || playerInput.Player.Fire.IsPressed())
        {
            animator.SetBool("usingWaterGun", true);
        }
        else
        {
            animator.SetBool("usingWaterGun", false);
        }
    }

    void HandleAnimation()
    {
        bool isWalking = animator.GetBool("isWalking");

        if (isMovementPressed && !isWalking)
        {
            animator.SetBool("isWalking", true);
            // Debug.Log("player is walking");
        }
        else if (!isMovementPressed && isWalking)
        {
            animator.SetBool("isWalking", false);
            //  Debug.Log("player is not walking");
        }
    }

    private void OnEnable()
    {
        playerInput.Player.Enable();
        playerInput.Player.Interact.performed += HandleInteractAnimation;

    }

    private void OnDisable()
    {
        playerInput.Player.Disable();
    }
}
