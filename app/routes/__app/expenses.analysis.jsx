import ExpensesStatistics from '~/components/expenses/ExpenseStatistics'
import Chart from '~/components/expenses/Chart'
import { getExpenses } from '../../data/expenses.server'
import { useLoaderData } from '@remix-run/react'
import { requireUserSession } from '../../data/auth.server'



const ExpensesAnalysis = () => { 
    const expenses = useLoaderData()
    console.log(expenses)
    if(expenses.length === 0 || !expenses) { 
        return <p>go and add some expeses first</p>
    }else { 
        return ( 
           <main>
            <Chart expenses={expenses} />
            <ExpensesStatistics expenses={expenses} />
           </main>
        )
    }
}

export  async function loader({request}) { 
    const userId = await requireUserSession(request)
    await requireUserSession(request)

    const expenses = await getExpenses(userId)
    return expenses
}


export default ExpensesAnalysis