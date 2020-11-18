const dataEndpoint = '/d2l/api/ap/unstable/orgStructureGraph/data';

export const ORG_UNIT = {
    ID: 0,
    NAME: 1,
    TYPE: 2,
    TYPE_NAME: 3
};

export async function fetchData() {
    const url = new URL(dataEndpoint, window.location.origin);
    const response = await fetch(url.toString());
    return await response.json();
}

export async function fetchMockData() {
    return {
        orgUnits: [
            ['6606', 'Org', '1', 'Organization'],
            ['1', 'Faculty 1', '2', 'Faculty'],
            ['2', 'Faculty 2', '2', 'Faculty'],
            ['11', 'Department 1-1', '3', 'Department'],
            ['12', 'Department 1-2', '3', 'Department'],
            ['21', 'Department 2-1', '3', 'Department'],
            ['111', 'Course 11-1', '4', 'Course'],
            ['112', 'Course 11-2', '4', 'Course'],
            ['1000', 'Semester 1', '5', 'Semester'],
            ['2000', 'Semester 2', '5', 'Semester'],
            ['1111', 'Course 11-1 Semester 1', '6', 'Course Offering'],
            ['1112', 'Course 11-2 Semester 1', '6', 'Course Offering'],
        ],
        orgUnitParents: [
            ['6606', '0'],
            ['1', '6606'],
            ['2', '6606'],
            ['11', '1'],
            ['12', '1'],
            ['21', '2'],
            ['111', '11'],
            ['112', '11'],
            ['1000', '6606'],
            ['2000', '6606'],
            ['1111', '111'],
            ['1111', '1000'],
            ['1112', '112'],
            ['1112', '1000']
        ]
    };
}
