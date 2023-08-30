import { Link, Outlet, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import expensesStyles from '~/styles/expenses.css'
import ExpensesList from '~/components/expenses/ExpensesList'
import {FaPlus, FaDownload} from 'react-icons/fa'
import { getExpenses } from "../../data/expenses.server";
import { json } from "@remix-run/node";
import { requireUserSession } from "../../data/auth.server";



export default function ExpensesLayout() { 
    const expenses = useLoaderData()
    const hasExpenses = expenses && expenses.length > 0
    return ( 
        <>
            <Outlet/>
        <main>
            <section id="expenses-action">

                    <Link to="add">
                        <FaPlus/>
                        <span>Add Expenses</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload/>
                        <span>Load Raw Data </span>
                    </a>
            </section>
            {hasExpenses && <ExpensesList expenses={expenses} />}
            {!hasExpenses && <section id="no-expenses">
                <h1> No Expenses Found</h1>
                <p>Start <Link to='add'>adding some</Link>Today</p>
                </section>}
        </main>
        </>
    )
}
export async function loader({request}){
    const userId  = await  requireUserSession(request)
    const expenses = await getExpenses(userId)
    return json(expenses, {headers: { 
      'Cache-Control' : 'max-age=3'
    }})
}

export function links() { 
    return [{rel: 'stylesheet', href: expensesStyles}]
}


export function ErrorBoundary() {
    const error = useRouteError();
  
    if (isRouteErrorResponse(error)) {
      return (
        <h1>error one</h1>
        // <Document title={error.statusText}>
        //   <Error title={error.statusText}>
        //     <p>{error.data || 'some random erry i dont know'}</p>
        //     <p>Back to <Link to="/">Safty</Link></p>
        //   </Error>
        // </Document>
      );
    } else if (error instanceof Error) {
      return (
        <h1>Error two</h1>
        // <Document title="An Error Occured">
        //   <Error title="Errorrrr">
        // <div>
        //   <h1>Seond one Error</h1>
        //   <p>{error.message}</p>
        //   <p>The stack trace is:</p>
        //   <pre>{error.stack}</pre>
        // </div>
        //   </Error>
        // </Document>
      );
    } else {
      return ( 
        <h1>Error thrre</h1>
    //     <Document title="An Error Occured">
    //     <Error title="Errorrrr">
    //   <div>
    //     <h1>last one Error</h1>
    //     <p>{error.message}</p>
    //     <p>The stack trace is:</p>
        
    //   </div>
    //     </Error>
    //   </Document>
      )
    }
  }

  
export function headers ({
  actionHeaders, 
  loaderHeaders, 
  parentHeaders
}) { 
  return { 
    'Cache-Control' : loaderHeaders.get('Cache-Control') // 60 minutes
  }
}
