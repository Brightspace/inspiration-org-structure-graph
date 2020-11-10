export function getOrgData() {
    return {
        orgUnits: [
            {
                id: 6606,
                name: 'Org',
                type: 'Organization'
            },
            {
                id: 1,
                name: 'Faculty 1',
                type: 'Faculty'
            },
            {
                id: 2,
                name: 'Faculty 2',
                type: 'Faculty'
            },
            {
                id: 11,
                name: 'Department 1-1',
                type: 'Department'
            },
            {
                id: 12,
                name: 'Department 1-2',
                type: 'Department'
            },
            {
                id: 21,
                name: 'Department 2-1',
                type: 'Department'
            },
            // {
            //     id: 111,
            //     name: 'Course 11-1',
            //     type: 'Course'
            // },
            // {
            //     id: 112,
            //     name: 'Course 11-2',
            //     type: 'Course'
            // },
            // {
            //     id: 1000,
            //     name: 'Semester 1',
            //     type: 'Semester'
            // },
            // {
            //     id: 2000,
            //     name: 'Semester 2',
            //     type: 'Semester'
            // },
            // {
            //     id: 1111,
            //     name: 'Course 11-1 Semester 1',
            //     type: 'Course Offering'
            // },
            // {
            //     id: 1112,
            //     name: 'Course 11-2 Semester 1',
            //     type: 'Course Offering'
            // },
        ],
        structure: [
            {
                child: 1,
                parent: 6606
            },
            {
                child: 2,
                parent: 6606
            },
            {
                child: 11,
                parent: 1
            },
            {
                child: 12,
                parent: 1
            },
            {
                child: 21,
                parent: 2
            },
            // {
            //     child: 111,
            //     parent: 11
            // },
            // {
            //     child: 112,
            //     parent: 11
            // },
            // {
            //     child: 1000,
            //     parent: 6606
            // },
            // {
            //     child: 2000,
            //     parent: 6606
            // },
            // {
            //     child: 1111,
            //     parent: 111
            // },
            // {
            //     child: 1111,
            //     parent: 1000
            // },
            // {
            //     child: 1112,
            //     parent: 112
            // },
            // {
            //     child: 1112,
            //     parent: 1000
            // },
        ]
    };
}
