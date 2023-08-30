import { useLoaderData, useNavigate } from '@remix-run/react'
import ExpensesForm from '~/components/expenses/ExpenseForm'
import Modal from '~/components/util/Modal'
import { deleteExpense, updateExpense } from '../../../data/expenses.server'
import { redirect } from '@remix-run/node'
import {validateExpenseInput} from '../../../data/validation.server'
// import { getExpense } from '../../../data/expenses.server'

export default function UpdateExpensePage () { 
    const navigate = useNavigate()

    function closeHandler() { 
        // navigate programmetically 
        navigate('..')
    }
    return ( 
   
        <Modal onClose={closeHandler}>
        <ExpensesForm/>
        </Modal>
       
    )
}

    // export async function loader({params}) { 
    //     const expenseId = params.id
    //     const expense = await getExpense(expenseId)
    //     return expense
    // }


    export async function action({params, request}) { 
        const expenseId = params.id

        if(request.method === 'PATCH') { 

            const formData = await request.formData()
            const expenseData = Object.fromEntries(formData)
    
            try { 
                validateExpenseInput(expenseData)
            }catch(error) { 
                console.log(error)
                throw error
            }
    
            await updateExpense(expenseId, expenseData)
            return redirect('..')
        }else if (request.method === 'DELETE') { 
             await deleteExpense(expenseId)
            //  return redirect('..')
            return {deleteId: expenseId}
        }


    }