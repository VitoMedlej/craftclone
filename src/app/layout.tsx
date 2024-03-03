import Navbar from '@/Components/Navbar/Navbar'
import '../Styles/Styles.css'
import '../Styles/qty.css'
import Footer from '@/Components/Footer/Footer'
import Sidebar from '@/Components/Sidebar/Sidebar'
import ScrollToTop from '@/Components/ScrollToTop/ScrollToTop'
import QuickCart from '@/Components/Shared/QuickCart/QuickCart'
import ContextWrapper from '@/context/Contexts'
import Popup from '@/Components/Popup/Popup'

export const metadata = {
    title: 'The Craft Room | Arts & Crafts Supplies, Cricut Products',
    description: `Shop at The Craft Room, where creativity becomes reality. Find all your arts and
     crafts supplies, including best Cricut products in Lebanon`,
    icons: {
        icon: `uploadcarecdn9f0e31cb-bce5-49f5-96bf-40e579295a42/LOGO71.png`
    }
}

export default function RootLayout({children} : {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700&display=swap"
                    rel="stylesheet"/>
            </head>

            <body className='relative'>

                <ContextWrapper>
                    <Navbar/>
                    <Sidebar cates={undefined}/>
                    <QuickCart/>
                    <ScrollToTop/>
                    <Popup/>
                    <main style={{marginTop:6}}>

                     {children}
                    </main>
                </ContextWrapper>
                <Footer/>
            </body>
        </html>
    )
}
