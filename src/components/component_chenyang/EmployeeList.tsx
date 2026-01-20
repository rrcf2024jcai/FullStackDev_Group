function EmployeeList() {
    const employees = [
      { id: 1, name: "Chenyang Ma", role: "Manager", department: "Human Resources" },
      { id: 2, name: "Jiyu Cai", role: "Manager", department: "Information Technology" },
      { id: 3, name: "Alyssa Urquiola", role: "Manager", department: "Financial Services" },
      { id: 4, name: "Kate Fleetwood", role: "Auditor", department: "Audit" },
      { id: 5, name: "Priyanka Bose", role: "Analyst", department: "Banking Operations" },
      { id: 6, name: "Gil Cardinal", role: "Specialist", department: "Communications" },
      { id: 7, name: "Randy Bradshaw", role: "Coordinator", department: "Corporate Services" },
      { id: 8, name: "Dakota House", role: "Technician", department: "Facilities" },
      { id: 9, name: "Selina Hanusa", role: "Analyst", department: "Financial Services" },
      { id: 10, name: "Jesse Ed Azure", role: "Coordinator", department: "Human Resources" },
      { id: 11, name: "Graham Greene", role: "Developer", department: "Information Technology" },
      { id: 12, name: "Jennifer Rodriguez", role: "Software Developer", department: "Information Technology" },
      { id: 13, name: "Aiyana Littlebear", role: "IT Technician", department: "Information Technology" },
      { id: 14, name: "Tala Braveheart", role: "IT Technician", department: "Information Technology" },
      { id: 15, name: "Onatah Redhawk", role: "IT Technician", department: "Information Technology" },
    ];
  
    return (
      <section>
        <h2>Employee List</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.role} - {employee.department}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  
  export default EmployeeList;