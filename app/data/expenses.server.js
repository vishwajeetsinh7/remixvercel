import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: {connect: {id: userId}}
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses (userId) { 
  if(!userId) { 
    throw new Error('failed to get expesses')
  }
    try { 
        const expenses = await prisma.expense.findMany({
          where: {userId : userId}, 
          orderBy: {date: 'desc'
        }})
        return expenses
    }catch(error) { 
       throw new Error('somehting went wrong on our side not uour fault')
    }
}

export async function getExpense(id) { 
    try { 
        const expense = await prisma.expense.findFirst({where:{id}})
        return expense
    }catch(error) { 
        throw new Error('failed to get expenses ')
    }
}

export async function updateExpense(id, expenseData) { 
  try { 
    await prisma.expense.update({
      where: {id}, 
      data: { 
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      }
    })
  }catch(error) { 
    throw new Error("Failed to update expense")
  }
}


export async function deleteExpense(id) { 
  try { 
    await prisma.expense.delete({
      where:{id }
    })
  }catch(error) { 
    throw new Error('Failed to delete expense.')
  }
}