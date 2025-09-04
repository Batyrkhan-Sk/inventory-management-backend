import prisma from '../config/prisma';

export const getAllInventories = async () => {
  try {
    const inventories = await prisma.inventory.findMany({
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        tags: true,
        _count: {
          select: {
            items: true,
            accessList: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return inventories;
  } catch (error) {
    console.error('Error fetching inventories:', error);
    throw new Error('Failed to fetch inventories');
  }
};

export const getInventoryById = async (id: string) => {
  try {
    const inventory = await prisma.inventory.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        tags: true,
        fields: {
          orderBy: {
            order: 'asc'
          }
        },
        items: {
          include: {
            createdBy: {
              select: {
                id: true,
                username: true
              }
            },
            _count: {
              select: {
                likes: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            items: true,
            accessList: true
          }
        }
      }
    });
    return inventory;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw new Error('Failed to fetch inventory');
  }
};

export const createInventory = async (
  data: {
    title: string;
    description?: string;
    category?: string;
    isPublic?: boolean;
    imageUrl?: string;
    customIdFormat?: any;
  },
  ownerId: string
) => {
  try {
    const inventory = await prisma.inventory.create({
      data: {
        ...data,
        ownerId,
        customIdFormat: data.customIdFormat || { prefix: "", format: "AUTO_INCREMENT" },
      },
      include: {
        owner: {
          select: { id: true, username: true, email: true },
        },
        tags: true,
      },
    });

    return inventory;
  } catch (error) {
    console.error("Error creating inventory:", error);
    throw new Error("Failed to create inventory");
  }
};

export const updateInventory = async (id: string, data: any) => {
  try {
    const inventory = await prisma.inventory.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
        version: {
          increment: 1
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        tags: true
      }
    });
    return inventory;
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw new Error('Failed to update inventory');
  }
};

export const deleteInventory = async (id: string) => {
  try {
    const inventory = await prisma.inventory.delete({
      where: { id }
    });
    return inventory;
  } catch (error) {
    console.error('Error deleting inventory:', error);
    throw new Error('Failed to delete inventory');
  }
};