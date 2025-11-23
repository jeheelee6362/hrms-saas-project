const siteMapTree = [
    {
        label: 'Home',
        header: 'root'
    },
    {
        label: 'Learn About Us',
        header: 'generic',
        children: [
            { 
                label: 'About Attofund',
                header: 'text'
            },
            { 
                label: 'What is Income Synchronization',
                header: 'text'
            },
            { 
                label: 'Media Center',
                header: 'text'
            },
            { 
                label: 'Meet Our Team',
                header: 'text'
            },
        ]
    },
    {
        label: 'Blogs',
        header: 'generic'
    },
    {
        label: 'Data Security',
        header: 'generic'
    },
    {
        label: 'How to Guide',
        header: 'generic',
        children: [
            {
                label: 'Getting Started',
                header: 'text'
            },
            {
                label: 'Instructional Resources',
                header: 'text'
            },
            {
                label: 'Time and Attendance',
                header: 'text'
            },
            {
                label: 'Tax Compliance',
                header: 'text'
            }
        ]
    },
    {
        label: 'Site Map',
        header: 'generic'
    },
    {
        label: 'Stay With Us',
        header: 'generic',
        children: [
            {
                label: 'Careers',
                header: 'text'
            },
            {
                label: 'Investor Relations',
                header: 'text'
            }
        ]
    },
    {
        label: 'Help Center',
        header: 'generic',
        children: [
            {
                label: 'Contact Us',
                header: 'text'
            },
            {
                label: 'Your Account',
                header: 'text'
            },
            {
                label: 'FAQs',
                header: 'text'
            }
        ]
    },
    {
        label: 'Legal',
        header: 'generic'
    }
]

export default siteMapTree