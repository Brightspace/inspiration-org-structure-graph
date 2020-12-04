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
            ['3', 'Faculty 3', '3', 'Faculty'],
            ['11', 'Department 1-1', '3', 'Department'],
            ['12', 'Department 1-2', '3', 'Department'],
            ['21', 'Department 2-1', '3', 'Department'],
            ['22', 'Department 2-2', '3', 'Department'],
            ['31', 'Department 3-1', '3', 'Department'],
            ['31', 'Department 3-2', '3', 'Department'],
            ['111', 'Course 11-1', '4', 'Course'],
            ['112', 'Course 11-2', '4', 'Course'],
            ['121', 'Course 12-1', '4', 'Course'],
            ['211', 'Course 21-1', '4', 'Course'],
            ['221', 'Course 22-1', '4', 'Course'],
            ['222', 'Course 22-2', '4', 'Course'],
            ['223', 'Course 22-3', '4', 'Course'],
            ['1000', 'Semester 1', '5', 'Semester'],
            ['2000', 'Semester 2', '5', 'Semester'],
            ['1111', 'Course 11-1 Semester 1', '6', 'Course Offering'],
            ['2111', 'Course 11-1 Semester 2', '6', 'Course Offering'],
            ['1112', 'Course 11-2 Semester 1', '6', 'Course Offering'],
            ['1121', 'Course 12-1 Semester 1', '6', 'Course Offering'],
            ['2121', 'Course 12-1 Semester 2', '6', 'Course Offering'],
            ['2211', 'Course 21-1 Semester 2', '6', 'Course Offering'],
            ['1221', 'Course 22-1 Semester 1', '6', 'Course Offering'],
            ['2222', 'Course 22-2 Semester 2', '6', 'Course Offering'],
            ['1223', 'Course 22-3 Semester 1', '6', 'Course Offering'],
        ],
        orgUnitParents: [
            ['6606', '0'],
            ['1', '6606'],
            ['2', '6606'],
            // ['3', '6606'],

            ['11', '1'],
            ['12', '1'],
            ['21', '2'],
            ['22', '2'],
            // ['31', '3'],
            // ['32', '3'],

            ['111', '11'],
            ['112', '11'],
            ['121', '12'],
            ['211', '21'],
            ['221', '22'],
            ['222', '22'],
            ['223', '22'],


            ['1000', '6606'],
            ['2000', '6606'],

            ['1111', '111'],
            ['1112', '112'],
            ['1121', '121'],
            ['1221', '221'],
            ['1223', '223'],
            ['2111', '111'],
            ['2121', '121'],
            ['2211', '211'],
            ['2222', '222'],

            ['1111', '1000'],
            ['1112', '1000'],
            ['1121', '1000'],
            ['1221', '1000'],
            ['1223', '1000'],
            ['2111', '2000'],
            ['2121', '2000'],
            ['2211', '2000'],
            ['2222', '2000']
        ]
    };
}
