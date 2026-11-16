#pragma once

#include "CoreMinimal.h"
#include "Components/ActorComponent.h"
#include "InventoryComponent.generated.h"

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnEquipItem, int32, ItemIndex, bool, isItemEquped);
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnItemUse, int32, ItemIndex);

USTRUCT(BlueprintType)
struct FEquipableItem : public FTableRowBase
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 CurrentAmount;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 MaxAmount;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TSubclassOf<AActor> ItemClass;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TSubclassOf<AActor> ItemPickupClass;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FTransform PickupTransform;
};

USTRUCT(BlueprintType)
struct FKeyItem : public FTableRowBase
{
	GENERATED_BODY()

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	int32 KeyType;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	TSubclassOf<AActor> KeyPickupClass;

	UPROPERTY(EditAnywhere, BlueprintReadWrite)
	FTransform PickupTransform;
};

UCLASS( ClassGroup=(Custom), meta=(BlueprintSpawnableComponent), Blueprintable)
class COLDTURKEY_API UInventoryComponent : public UActorComponent
{
	GENERATED_BODY()

public:
	// Sets default values for this component's properties
	UInventoryComponent();

protected:
	// Called when the game starts
	virtual void BeginPlay() override;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	TArray<FEquipableItem> inventory;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	TArray<FEquipableItem> savedInventory;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	TArray<FKeyItem> KeyInventory;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	int32 equipedItemIndex;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	float maxFlareTime;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	float currentFlareTime;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	bool isItemEquped;

	UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")
	bool isFlareActive;

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void UseItem(int32 ItemIndex);

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void SetEquipedItemIndex(int32 ItemIndex);

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void UnequipItem();

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void ReduceItemAmountAtIndex(int32 ItemIndex);

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	bool AddItemAmountAtIndex(int32 ItemIndex);

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void AddKey(FKeyItem Key);

	UFUNCTION(BlueprintCallable, BlueprintPure, Category = "Inventory")
	bool HasKey(int32 Key);

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void SaveInventory();

	UFUNCTION(BlueprintCallable, Category = "Inventory")
	void LoadInventory();

public:
	// Called every frame
	virtual void TickComponent(float DeltaTime, ELevelTick TickType, FActorComponentTickFunction* ThisTickFunction) override;

	UPROPERTY(BlueprintAssignable)
	FOnEquipItem OnEquipItem;


	UPROPERTY(BlueprintAssignable)
	FOnItemUse OnItemUse;
};
