#include "InventoryComponent.h"

void UInventoryComponent::UseItem(int32 ItemIndex)
{
	if (equipedItemIndex == -1)
	{
		UE_LOG(LogTemp, Warning, TEXT("Item at index %d is not equipped"), ItemIndex);
		return;
	}

	OnItemUse.Broadcast(ItemIndex);
}

void UInventoryComponent::SetEquipedItemIndex(int32 ItemIndex)
{
	if (ItemIndex != equipedItemIndex)
	{
		isItemEquped = true;
		equipedItemIndex = ItemIndex;
	}
	else
	{
		isItemEquped = false;
		equipedItemIndex = -1;
	}

	OnEquipItem.Broadcast(ItemIndex, isItemEquped);
}

void UInventoryComponent::UnequipItem()
{
	equipedItemIndex = -1;
	isItemEquped = false;
}

void UInventoryComponent::ReduceItemAmountAtIndex(int32 ItemIndex)
{
	inventory[ItemIndex].CurrentAmount--;
}

bool UInventoryComponent::AddItemAmountAtIndex(int32 ItemIndex)
{
	if (inventory[ItemIndex].CurrentAmount + 1 > inventory[ItemIndex].MaxAmount)
	{
		UE_LOG(LogTemp, Warning, TEXT("Cannot add more items, max amount reached for item at index %d"), ItemIndex);
		return false;
	}

	inventory[ItemIndex].CurrentAmount++;
	return true;
}

void UInventoryComponent::AddKey(FKeyItem Key)
{
	for (const FKeyItem& ExistingKey : KeyInventory)
	{
		if (ExistingKey.KeyType == Key.KeyType)
		{
			UE_LOG(LogTemp, Warning, TEXT("Key %d already exists in the inventory"), Key.KeyType);
			return;
		}
	}

	KeyInventory.Add(Key);
	UE_LOG(LogTemp, Log, TEXT("Key %d added to the inventory"), Key.KeyType);
}

bool UInventoryComponent::HasKey(int32 Key)
{
	for (const FKeyItem& ExistingKey : KeyInventory)
	{
		if (ExistingKey.KeyType == Key)
		{
			UE_LOG(LogTemp, Warning, TEXT("Has the key type: %d"), Key);
			return true;
		}
	}

	return false;
}

void UInventoryComponent::SaveInventory()
{
	savedInventory = inventory;
}

void UInventoryComponent::LoadInventory()
{
	inventory = savedInventory;
}
