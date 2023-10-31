import { prisma } from "../app/utils/prisma";

const grades: {name: string, short_name: string}[] = [
    {name: 'Kindergarten One', short_name: 'KG1'},
    {name: 'Kindergarten TWo', short_name: 'KG2'},
    {name: 'Basic One', short_name: 'B1'},
    {name: 'Basic Two', short_name: 'B2'},
    {name: 'Basic Three', short_name: 'B3'},
    {name: 'Basic Four', short_name: 'B4'},
    {name: 'Basic Five', short_name: 'B5'},
    {name: 'Basic Six', short_name: 'B6'},
    {name: 'Basic Seven', short_name: 'B7'},
    {name: 'Basic Eight', short_name: 'B8'},
    {name: 'Basic Nine', short_name: 'B9'},
    {name: 'Senior High School 1', short_name: 'SHS1'},
    {name: 'Senior High School 2', short_name: 'SHS2'},
    {name: 'Senior High School 3', short_name: 'SHS3'}
  ];

const programmes: {name: string, code: string}[] = [
    {name: 'Agricultural Science', code: 'AGR'},
    {name: 'Business Accounting', code: 'BUS'},
    {name: 'Business Secretariat', code: 'SEC'},
    {name: 'General Arts', code: 'ARTS'},
    {name: 'General Science', code: 'SCI'},
    {name: 'Home Economics', code: 'HE'},
    {name: 'Visual Arts', code: 'VARTS'},
    {name: 'Technical', code: 'TECH'}
]

const main = async () => {
    const grds = await prisma.grade.createMany({
        data: grades
    })

    const progs = await prisma.programme.createMany({
        data: programmes
    })
    console.log(grds, progs);
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  