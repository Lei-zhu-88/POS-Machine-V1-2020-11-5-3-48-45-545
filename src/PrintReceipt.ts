import { loadAllItems, loadPromotions } from './Dependencies'

export function printReceipt(tags: string[]): string {



  // const subTotalPrices: String[] = calculatePrices(promotion)
  // return receptRender(subTotalPrices,receptItems)


  const promoteRule: Promotion[] = loadPromotions()
  const decodedTags: Tag[] = decode(tags)
  const items: Item[] = buildItems(decodedTags, promoteRule)

  return `***<store earning no money>Receipt ***
${renderItems(items)}
----------------------
Total：${renderTotalPrice(items).toFixed(2)}(yuan)
Discounted prices：${renderDiscountedPrice(items)}(yuan)
**********************`
}

// receptRender(subTotalPrices：String[], receptItems: Item[]): String{

// }

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

function renderTotalPrice(items: Item[]): number {
  return items.map(item => item.subTotal).reduce((a,b)=> a+b)
  //'58.50'
}
function renderDiscountedPrice(items: Item[]): string {
  return '7.50'
}

function renderItems(items: Item[]): string {
  return items.map(item=>`Name：${item.name}，Quantity：${item.quantity} ${item.unit}s，Unit：${item.unitPrice.toFixed(2)}(yuan)，Subtotal：${item.subTotal.toFixed(2)}(yuan)`).join('\n')
  // return 'Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)\n' +
  //   'Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)\n' +
  //   'Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)'
}

function buildItems(tags: Tag[], promoterule: Promotion[]): Item[] {
  return [{
    name: 'Sprite',
    quantity: 5,
    unitPrice: 3.00,
    unit: 'bottle',
    subTotal: 12.00
  }, {
    name: 'Litchi',
    quantity: 2.5,
    unitPrice: 15.00,
    unit: 'pound',
    subTotal: 37.50
  }, {
    name: 'Instant Noodles',
    quantity: 3,
    unitPrice: 4.50,
    unit: 'bag',
    subTotal: 9.00
  }]

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
  quantity: number
  unitPrice: number
  unit: string
  subTotal: number
}

interface Promotion {
  type: string
  barcodes: string[]
}