public class RitualStoneLock : MonoBehaviour
{
    public GameObject StoneKey;
    public UnityEvent TryOpenDoor;
    public bool Completed = false;
    private Collider thisObjectsCollider;

    private void Start()
    {
        thisObjectsCollider = GetComponent<Collider>();
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.CompareTag("canPickUp") && other.gameObject == StoneKey)
        {
            var temp = other.GetComponentInParent<PickupAndThrow>();
            if (temp != null)
            {
                temp.DropObject();
            }

            if (other.TryGetComponent<Rigidbody>(out Rigidbody tempRB))
            {
                tempRB.isKinematic = true;
            }
            other.gameObject.tag = "Untagged";
            other.transform.parent = transform;
            other.transform.localPosition = Vector3.zero;
            other.transform.localRotation = Quaternion.identity;
            Completed = true;
            TryOpenDoor.Invoke();
            FMODUnity.RuntimeManager.PlayOneShot("event:/MainMenu_Click", GetComponent<Transform>().position);
            thisObjectsCollider.enabled = false;
        }
    }
}
