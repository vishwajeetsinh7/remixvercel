import { requireUserSession } from "../data/auth.server"
import { getExpense } from "../data/expenses.server"




// const ExpensesRaw = () => { 
//     return ( 
//         <div> 
//             <h1>Expenses Raw</h1>
//         </div>
//     )
// }

// export default ExpensesRaw


export async function loader({request}) { 
    await requireUserSession(request)
    return getExpense()
}