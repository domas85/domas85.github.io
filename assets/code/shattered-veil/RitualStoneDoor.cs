public enum DoorType
{
    NormalDoor,
    StoneDoor,
    FogDoor
}

public class RitualStoneDoor : MonoBehaviour
{
    public DoorType DoorType;
    public AnimationCurve DoorOpeningAnimationSpeed;
    public Transform NormalDoorPivotPoint;
    public float OpenDoorRotationAngle = 100f;
    public List<GameObject> ConditionObjects;

    private ParticleSystem fogParticles;
    private Collider fogCollider;
    private Animator rockDoorAnimator;
    private int completedObjects = 0;
    private RotationDirection direction;

    private void Start()
    {
        if (OpenDoorRotationAngle > 0)
        {
            direction = RotationDirection.PositiveNums;
        }
        else
        {
            direction = RotationDirection.NegativeNums;
        }
    }

    public void TryOpenDoor()
    {
        completedObjects = 0;
        for (int i = 0; i < ConditionObjects.Count; i++)
        {
            if (ConditionObjects[i].TryGetComponent<RitualStoneLock>(out RitualStoneLock TheLock))
            {
                if (TheLock.Completed == true)
                {
                    completedObjects++;
                }
            }
        }

        if (completedObjects == ConditionObjects.Count)
        {
            switch (DoorType)
            {
                case DoorType.NormalDoor:
                    StartCoroutine(DoorOpenInProgress());

                    break;
                case DoorType.StoneDoor:
                    rockDoorAnimator = gameObject.GetComponent<Animator>();
                    rockDoorAnimator.SetTrigger("Open");

                    break;
                case DoorType.FogDoor:
                    fogParticles = gameObject.GetComponent<ParticleSystem>();
                    fogCollider = gameObject.GetComponent<Collider>();
                    fogCollider.enabled = false;
                    var tempMain = fogParticles.main;
                    tempMain.loop = false;
                    tempMain.startLifetime = 0.5f;
                    tempMain.simulationSpeed = 3f;

                    break;
            }
        }
        else
        {
            Debug.Log("Not all conditions are met");
        }
    }

    public IEnumerator DoorOpenInProgress()
    {
        switch (direction)
        {
            case RotationDirection.PositiveNums:
                while (NormalDoorPivotPoint.localEulerAngles.y + 0.0001f < OpenDoorRotationAngle - (Math.Round(OpenDoorRotationAngle / 360) * 360))
                {
                    NormalDoorPivotPoint.localRotation = Quaternion.Lerp(NormalDoorPivotPoint.localRotation, Quaternion.Euler(new Vector3(0, OpenDoorRotationAngle, 0)), DoorOpeningAnimationSpeed.Evaluate(Time.deltaTime));
                    yield return null;
                }

                break;
            case RotationDirection.NegativeNums:

                while (NormalDoorPivotPoint.localEulerAngles.y - 0.0001f > (OpenDoorRotationAngle - (Math.Round(OpenDoorRotationAngle / 360) * 360)) + 360 || NormalDoorPivotPoint.localEulerAngles.y <= 0f)
                {
                    NormalDoorPivotPoint.localRotation = Quaternion.Lerp(NormalDoorPivotPoint.localRotation, Quaternion.Euler(new Vector3(0, OpenDoorRotationAngle, 0)), DoorOpeningAnimationSpeed.Evaluate(Time.deltaTime));
                    yield return null;
                }

                break;
        }
    }

    private void OnDrawGizmos()
    {
        if (DoorType == DoorType.NormalDoor)
        {
            Gizmos.color = Color.red;
            var direction = Quaternion.AngleAxis(OpenDoorRotationAngle, transform.up) * NormalDoorPivotPoint.forward;
            Gizmos.DrawRay(NormalDoorPivotPoint.position, direction * 2f);
            Gizmos.color = Color.blue;
            Gizmos.DrawRay(NormalDoorPivotPoint.position, NormalDoorPivotPoint.forward * 2f);
        }
    }
}
