import prisma from "../config/prisma";

export const getItemsByInventoryId = async (inventoryId: string) => {
  return prisma.item.findMany({
    where: { inventoryId },
  });
};

export const createItem = async (itemData: any) => {
  return prisma.item.create({
    data: {
      inventoryId: itemData.inventoryId,
      description: itemData.description,
      title: itemData.title,
      price: itemData.price,
      quantity: itemData.quantity,
      category: itemData.category,
      imageUrl: itemData.imageUrl,
      createdById: itemData.createdById,
      customId: itemData.customId || crypto.randomUUID().slice(0, 8)
    }
  });
};

export const findByCustomId = async (inventoryId: string, customId: string) => {
  return prisma.item.findUnique({
    where: {
      inventoryId_customId: {
        inventoryId,
        customId,
      },
    },
  });
};

export const getItemById = async (itemId: string) => {
  return prisma.item.findUnique({
    where: { id: itemId },
  });
};

export const updateItem = async (itemId: string, updateData: any) => {
  return prisma.item.update({
    where: { id: itemId },
    data: updateData
  });
};

export const deleteItem = async (itemId: string) => {
  return prisma.item.delete({
    where: { id: itemId }
  });
};