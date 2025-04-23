CONTACTS_MOCK = [
    {
        "id": "c1",
        "name": "James Sullivan",
        "email": "james@techcorp.com",
        "company": "Tech Corp",
        "phone": "(555) 123-4567",
        "status": "Customer",
        "lastContact": "2025-04-15"
    },
    {
        "id": "c2",
        "name": "Sarah Johnson",
        "email": "sarah@innovate.io",
        "company": "Innovate.io",
        "phone": "(555) 234-5678",
        "status": "Lead",
        "lastContact": "2025-04-10"
    },
    {
        "id": "c3",
        "name": "Michael Brown",
        "email": "michael@nextsoftware.com",
        "company": "Next Software",
        "phone": "(555) 345-6789",
        "status": "Customer",
        "lastContact": "2025-04-12"
    },
    {
        "id": "c4",
        "name": "Emily Davis",
        "email": "emily@globalmarketing.com",
        "company": "Global Marketing",
        "phone": "(555) 456-7890",
        "status": "Prospect",
        "lastContact": "2025-04-05"
    },
    {
        "id": "c5",
        "name": "David Wilson",
        "email": "david@futurefactory.com",
        "company": "Future Factory",
        "phone": "(555) 567-8901",
        "status": "Customer",
        "lastContact": "2025-04-08"
    },
    {
        "id": "c6",
        "name": "Jennifer Garcia",
        "email": "jennifer@apexconsulting.com",
        "company": "Apex Consulting",
        "phone": "(555) 678-9012",
        "status": "Lead",
        "lastContact": "2025-04-01"
    },
    {
        "id": "c7",
        "name": "Robert Martinez",
        "email": "robert@cloudcomputing.net",
        "company": "Cloud Computing Inc",
        "phone": "(555) 789-0123",
        "status": "Prospect",
        "lastContact": "2025-04-03"
    },
    {
        "id": "c8",
        "name": "Lisa Thompson",
        "email": "lisa@dataanalytics.org",
        "company": "Data Analytics Pro",
        "phone": "(555) 890-1234",
        "status": "Customer",
        "lastContact": "2025-04-07"
    }
]

COMPANIES_MOCK = [
    {
        "id": "comp1",
        "name": "Tech Corp",
        "industry": "Technology",
        "website": "https://techcorp.com",
        "location": "San Francisco, CA",
        "status": "Customer",
        "contactCount": 3
    },
    {
        "id": "comp2",
        "name": "Innovate.io",
        "industry": "Software",
        "website": "https://innovate.io",
        "location": "Austin, TX",
        "status": "Lead",
        "contactCount": 1
    },
    {
        "id": "comp3",
        "name": "Next Software",
        "industry": "Technology",
        "website": "https://nextsoftware.com",
        "location": "Seattle, WA",
        "status": "Customer",
        "contactCount": 2
    },
    {
        "id": "comp4",
        "name": "Global Marketing",
        "industry": "Marketing",
        "website": "https://globalmarketing.com",
        "location": "New York, NY",
        "status": "Prospect",
        "contactCount": 1
    },
    {
        "id": "comp5",
        "name": "Future Factory",
        "industry": "Manufacturing",
        "website": "https://futurefactory.com",
        "location": "Chicago, IL",
        "status": "Customer",
        "contactCount": 4
    },
    {
        "id": "comp6",
        "name": "Apex Consulting",
        "industry": "Consulting",
        "website": "https://apexconsulting.com",
        "location": "Boston, MA",
        "status": "Lead",
        "contactCount": 2
    },
    {
        "id": "comp7",
        "name": "Cloud Computing Inc",
        "industry": "Technology",
        "website": "https://cloudcomputing.net",
        "location": "Denver, CO",
        "status": "Prospect",
        "contactCount": 1
    },
    {
        "id": "comp8",
        "name": "Data Analytics Pro",
        "industry": "Data Services",
        "website": "https://dataanalytics.org",
        "location": "Portland, OR",
        "status": "Customer",
        "contactCount": 3
    }
]

DEALS_MOCK = [
    {
        "id": "d1",
        "title": "Enterprise Software Package",
        "company": "Tech Corp",
        "contactId": "c1",
        "value": 75000,
        "stage": "Negotiation",
        "date": "2025-04-30"
    },
    {
        "id": "d2",
        "title": "Marketing Campaign",
        "company": "Global Marketing",
        "contactId": "c4",
        "value": 25000,
        "stage": "Proposal",
        "date": "2025-05-15"
    },
    {
        "id": "d3",
        "title": "Data Analytics Platform",
        "company": "Data Analytics Pro",
        "contactId": "c8",
        "value": 50000,
        "stage": "Qualified",
        "date": "2025-05-10"
    },
    {
        "id": "d4",
        "title": "Cloud Migration Project",
        "company": "Cloud Computing Inc",
        "contactId": "c7",
        "value": 120000,
        "stage": "Won",
        "date": "2025-04-20"
    },
    {
        "id": "d5",
        "title": "IT Consulting Services",
        "company": "Apex Consulting",
        "contactId": "c6",
        "value": 30000,
        "stage": "Qualified",
        "date": "2025-05-25"
    },
    {
        "id": "d6",
        "title": "Software Implementation",
        "company": "Innovate.io",
        "contactId": "c2",
        "value": 45000,
        "stage": "Proposal",
        "date": "2025-05-05"
    },
    {
        "id": "d7",
        "title": "Hardware Upgrade",
        "company": "Future Factory",
        "contactId": "c5",
        "value": 85000,
        "stage": "Lost",
        "date": "2025-04-15"
    },
    {
        "id": "d8",
        "title": "Custom Development",
        "company": "Next Software",
        "contactId": "c3",
        "value": 60000,
        "stage": "Negotiation",
        "date": "2025-05-20"
    },
    {
        "id": "d9",
        "title": "Annual Support Contract",
        "company": "Tech Corp",
        "contactId": "c1",
        "value": 35000,
        "stage": "Won",
        "date": "2025-04-10"
    },
    {
        "id": "d10",
        "title": "Mobile App Development",
        "company": "Innovate.io",
        "contactId": "c2",
        "value": 55000,
        "stage": "Qualified",
        "date": "2025-06-01"
    }
]