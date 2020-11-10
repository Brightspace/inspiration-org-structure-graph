export function getOrgUnitData() {
    return `id,name,type,parent
6606,Org,Organization,
1,Faculty 1,Faculty,6606
2,Faculty 2,Faculty,6606
11,Department 1-1,Department,1
12,Department 1-2,Department,1
21,Department 2-1,Department,2
111,Course 11-1,Course,11
112,Course 11-2,Course,11
1111,Course 11-1 Semester 1,Course Offering,111
1112,Course 11-1 Semester 1,Course Offering,112`;
}

export function getSemesterData() {
    return `id,name,type,parent
6606,Org,Organization,
1000,Semester 1,Semester,6606
2000,Semester 2,Semester,6606
1111,Course 11-1 Semester 1,Course Offering,1000
1112,Course 11-1 Semester 1,Course Offering,1000`;
}
