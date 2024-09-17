//Form's elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const ul = document.querySelector("ul")
const span = document.querySelector("header p span")
const totalAmount = document.querySelector("header h2")

//get input for format
amount.oninput = () => {

    //got input and remove no number
    let value = amount.value.replace(/\D/g,"")

    value = Number(value)/100

    amount.value = formatCurrecyBRL(value)
}

function formatCurrecyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })

    return value
}

form.onsubmit = (event)=>{
    event.preventDefault()

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value.replace("R$",""),
        created_at: new Date(),
    }

    submitExpense(newExpense)
    
}

function submitExpense(newExpense){
    try{
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt",newExpense.category_name)

        const expenseDiv = document.createElement("div")
        expenseDiv.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseDesc = document.createElement("span")
        expenseDesc.textContent = newExpense.category_name

        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount}`

        const imgRemove = document.createElement("img")
        imgRemove.setAttribute("src", `./img/remove.svg`)
        imgRemove.setAttribute("alt",`remove`)
        imgRemove.classList.add("remove-icon")

        expenseDiv.prepend(expenseName)
        expenseDiv.append(expenseDesc)

        expenseItem.append(expenseIcon)
        expenseItem.append(expenseDiv)
        expenseItem.append(expenseAmount)
        expenseItem.append(imgRemove)
        ul.prepend(expenseItem)

        updateTotals()
    }catch(error){
        console.log(error)
        alert("não funcionaou")
    }
}

function updateTotals(){
    try{
        const items = ul.children
        span.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`

        let total = 0

        for(let i = 0; items.length; i++){
            const itemAmount = items[i].querySelector(".expense-amount")

            let value = itemAmount.textContent.replace(/[^\d,]/g,"").replace(",",".")

            value = parseFloat(value)

            if(isNaN(value)){
                return alert(
                    "não foi possivel realizar a soma"
                )
            }
            total += Number(value)
            totalAmount.innerHTML = `<small>R$</small> ${formatCurrecyBRL(total)}`
        }
    }catch(error){
        console.log(error)
    }
}

ul.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-icon")){
        const item = event.target.closest(".expense")
        item.remove()
    }
    updateTotals()
})