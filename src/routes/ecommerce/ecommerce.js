const promotion_rules = [{
    rule: "Nx$",
    discount_percentage: 20,
    n: 4
},
{
    rule: "AyA",
    discount_percentage: 15,
    n: 1
    }
]

const errores = 
    [{
        status: "NOK",
        error_message: "RULE DOES NOT EXIST"
    },
    {
        status: "NOK",
        error_message: "AMOUNT OR PRICE SHOULD BE GREATER THAN ZERO"
    },
    {
        status: "NOK",
        error_message: "INTERNAL SERVER ERROR"
    }
    ]

exports.checkcart = (ctx) => {
    try {
            const peticion = ctx.request.body
            const items = peticion.items
            const carro = []
            for (var i = 0; i < items.length; i++) {
                if(items[i].promotion != promotion_rules[0].rule && items[i].promotion != promotion_rules[1].rule && items[i].promotion != ""){
                    throw 0
                }
                if(items[i].amount <= 0 || items[i].unit_base_price <= 0){
                    throw 1
                }
                var discount = false
                var precio = items[i].unit_base_price * items[i].amount
                if(items[i].promotion == promotion_rules[0].rule )
                    if(items[i].amount % promotion_rules[0].n == 0){
                        precio = items[i].unit_base_price * items[i].amount * (1 - (promotion_rules[0].discount_percentage/100))
                        discount = true
                    }
                if(items[i].promotion == promotion_rules[1].rule )
                    if(items[i].amount % promotion_rules[1].n == 0){
                        precio = items[i].unit_base_price * items[i].amount * (1 - (promotion_rules[1].discount_percentage/100))
                        discount = true
                    }
        
                let detalle = {
                    "item_id": items[i].item_id,
                    "amount": items[i].amount,
                    "total_price": precio,
                    "promotion_applied": discount
                }
                carro.push(detalle)
            }
            
            var precio_total = 0
            for (var i = 0; i < carro.length; i++) {
                precio_total += carro[i].total_price
            }
        
            const product = {
                status: "OK",
                cart_id: peticion.cart_id,
                total_cart_amount: precio_total,
                details: carro,
        
            }
            ctx.body = product
        
            return ctx
        } catch (error) {
            if(error == 0 || error == 1){
                ctx.status = 400
                ctx.body = errores[error]
                return ctx
            }
            else{
                ctx.status = 500
                ctx.body = errores[2]
                return ctx
            }
            
        }
    }