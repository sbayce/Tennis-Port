import { Body, Column, Container, Head, Heading, Html, Img, Preview, Row, Section, Tailwind, Text } from '@react-email/components'
import { egp } from '@/utils/price-formatter'

type PurchaseReceiptEmailProps = {
    products: {
        productId: string;
        quantity: number;
        gripSize?: string | undefined;
        stringOption?: string | undefined;
        shoeSize?: string | undefined;
        image: string;
        price: number;
        name: string;
    }[],
    address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
        state: string;
    },
    order: {
        id: string,
        createdAt: string,
        totalAmount: number
    }
}

PurchaseReceiptEmail.PreviewProps = {
    products: [
        {
            productId: "product1",
            quantity: 3,
            gripSize: "4",
            stringOption: "strung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            price: 3999,
            name: "random product"
        },
        {
            productId: "product1",
            quantity: 3,
            gripSize: "4",
            stringOption: "strung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            price: 3999,
            name: "random product"
        },
        {
            productId: "product1",
            quantity: 3,
            gripSize: "4",
            stringOption: "strung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            price: 3999,
            name: "random product"
        },
        {
            productId: "product1",
            quantity: 3,
            gripSize: "4",
            stringOption: "strung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            price: 3999,
            name: "random product"
        },
        {
            productId: "product1",
            quantity: 3,
            gripSize: "4",
            stringOption: "strung",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
            price: 3999,
            name: "random product"
        }
    ],
    address: {
        city: "cairo",
        country: "egy",
        line1: "maadi",
        postal_code: "1171"
    },
    order: {
        id: "order id",
        createdAt: "2024-12-04T13:32:36.533Z",
        totalAmount: 10500
    }
}

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

export default function PurchaseReceiptEmail({ products, address, order }: PurchaseReceiptEmailProps) {
  return (
    <Html>
        <Preview>Order Conformation</Preview>
        <Tailwind>
            <Head />
            <Body className='font-sans'>
                <Container>
                    <Heading>
                        <Section>
                            <Img className="h-28 w-62" src="https://tennis-port-bucket.s3.eu-north-1.amazonaws.com/tennis-port.png" alt="tennis-port" />
                            <Text className='m-0 text-2xl font-semibold'>Purchase Receipt</Text>
                        </Section>
                    </Heading>
                    <Section className='flex flex-col'>
                        <div className='flex gap-2 flex-wrap justify-between'>
                            {products.map(product => 
                                <div key={product.productId} className="flex gap-4 items-center text-lg">
                                <div className="relative border rounded-lg">
                                    <div className="rounded-full w-4 h-4 flex items-center justify-center absolute text-white text-sm bg-[#202223] top-0 right-0">
                                        {product.quantity}
                                    </div>
                                    <Img className="h-20 w-20" src={product.image} alt="product-img" />
                                </div>
                                <div className='self-start'>
                                    <p className='m-0'>{product.name}</p>
                                    <p className="text-xs m-0">{egp.format(product.price)} EGP</p>
                                    {/* <p className="text-xs">{product.brand}</p> */}
                                    {product.gripSize && <p className="text-xs m-0">Grip: {product.gripSize}</p>}
                                    {product.stringOption && <p className="text-xs m-0">String option: {product.stringOption}</p>}
                                    {product.shoeSize && <p className="text-xs m-0">Size: {product.shoeSize}</p>}
                                </div>
                                </div>
                            )}
                        </div>
                    <Section>
                        <Text className='text-xl font-semibold'>Order Information</Text>
                        <Row>
                            <Column>
                                <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Order ID</Text>
                                <Text className='mb-0 mr-4'>{order.id}</Text>
                            </Column>
                            <Column>
                                <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Purchased On</Text>
                                <Text className='mb-0 mr-4'>{dateFormatter.format(new Date(order.createdAt))}</Text>
                            </Column>
                            <Column>
                                <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Price Paid</Text>
                                <Text className='mb-0 mr-4'>{egp.format(order.totalAmount)} EGP</Text>
                            </Column>
                        </Row>
                        <Text className='text-xl font-semibold'>Adress</Text>
                            <Row>
                                <Column>
                                    <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Country</Text>
                                    <Text className='mb-0 mr-4'>{address.country}</Text>
                                </Column>
                                <Column>
                                    <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>City</Text>
                                    <Text className='mb-0 mr-4'>{address.city}</Text>
                                </Column>
                                <Column>
                                    <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Adress 1</Text>
                                    <Text className='mb-0 mr-4'>{address.line1}</Text>
                                </Column>
                                {address.line2 && <Column>
                                    <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Adress 2</Text>
                                    <Text className='mb-0 mr-4'>{address.line2}</Text>
                                </Column>}
                                {address.state && <Column>
                                    <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>State</Text>
                                    <Text className='mb-0 mr-4'>{address.state}</Text>
                                </Column>}
                                <Column>
                                    <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>Postal Code</Text>
                                    <Text className='mb-0 mr-4'>{address.postal_code}</Text>
                                </Column>
                            </Row>
                        </Section>
                        
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
  )
}
