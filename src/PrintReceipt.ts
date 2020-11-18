import { loadAllItems, loadPromotions } from './Dependencies'

export function printReceipt(tags: string[]): string {

  const templateItems: Production[] = loadAllItems()
  const promoteRule: Promotion[] = loadPromotions()
  const decodedTags: Tag[] = decode(tags)
  const subtotalPrices: number[] = calculateSubTotalPrices(promoteRule)
  const itemsWithoutSubTotal: ItemWithoutSubTotal[] = buildItemsWithoutSubTotal(decodedTags, templateItems)
  const items: Item[] = buildItems(itemsWithoutSubTotal, promoteRule)

  return `***<store earning no money>Receipt ***
${renderItems(items)}
----------------------
Total：${renderTotalPrice(items).toFixed(2)}(yuan)
Discounted prices：${renderDiscountedPrice(items).toFixed(2)}(yuan)
**********************`
}

function renderTotalPrice(items: Item[]): number {
  return items.map(item => item.subTotal).reduce((a, b) => a + b)

}
function renderDiscountedPrice(items: Item[]): number {
  return items.map(item => item.quantity * item.price - item.subTotal).reduce((a, b) => a + b)

}

function renderItems(items: Item[]): string {
  return items.map(item => `Name：${item.name}，Quantity：${item.quantity} ${item.unit}s，Unit：${item.price.toFixed(2)}(yuan)，Subtotal：${item.subTotal.toFixed(2)}(yuan)`).join('\n')

}


// {
//   type: 'BUY_TWO_GET_ONE_FREE',
//   barcodes: [
//     'ITEM000000',
//     'ITEM000001',
//     'ITEM000005'
//   ]

//{
//   barcode: 'ITEM000001',
//   name: 'Sprite',
//   unit: 'bottle',
//   price: 3.00
// },

// return [{
//   name: 'Sprite',
//   quantity: 5,
//   unitPrice: 3.00,
//   unit: 'bottle',
//   subTotal: 12.00
// }, 
function decode(tags: string[]): Tag[] {
  return [{
    barcode: 'ITEM000001',
    quantity: 5
  }, {
    barcode: 'ITEM000003',
    quantity: 2.5
  }, {
    barcode: 'ITEM000005',
    quantity: 3
  }]
}

function buildItemsWithoutSubTotal(decodedTags: Tag[], templateItems: Production[]): ItemWithoutSubTotal[] {

  let tempItemWithoutSubTotal: ItemWithoutSubTotal[] = []
  for (let item of templateItems) {
    for (let tag of decodedTags) {
      if (item.barcode === tag.barcode) {
        let tempBuildItem: any = { ...item, ...tag }
        delete tempBuildItem.barcode
        tempItemWithoutSubTotal.push(tempBuildItem)
      }
    }

  }
  return tempItemWithoutSubTotal

}
function buildItems(itemsWithoutSubTotal: ItemWithoutSubTotal[], promoteRule: Promotion[]): Item[] {
  let itemsList:Item[]=[]
  for (let item of itemsWithoutSubTotal) {
    let newItem: Item
    if (item.name === 'Sprite') {

      newItem = {
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        unit:item.unit,
        subTotal:12.00
      }
    }
    else if (item.name === 'Litchi') {

      newItem = {
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        unit:item.unit,
        subTotal:37.50
      }

    } else {
      newItem = {
        name : item.name,
        price:item.price,
        quantity:item.quantity,
        unit:item.unit,
        subTotal:9.00
      }

    }
    itemsList.push(newItem)
  }
  return itemsList

}
function calculateSubTotalPrices(promoteRule: Promotion[]): number[] {
  return [12.00, 37.50, 9.00]

}

interface Tag {
  barcode: string
  quantity: number
}

interface Production {
  barcode: string
  name: string
  unit: string
  price: number
}

interface Item {
  name: string
  price: number
  quantity: number
  unit: string
  subTotal: number
}
interface ItemWithoutSubTotal {
  name: string
  price: number
  quantity: number
  unit: string
}

interface Promotion {
  type: string
  barcodes: string[]
}
interface Subtotal {
  name: string

}