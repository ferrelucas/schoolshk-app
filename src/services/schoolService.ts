import type { School } from '../types/school';

const API_URL = 'https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json';

export class SchoolService {
  private static instance: SchoolService;
  private schools: School[] = [];

  private constructor() {}

  static getInstance(): SchoolService {
    if (!SchoolService.instance) {
      SchoolService.instance = new SchoolService();
    }
    return SchoolService.instance;
  }

  async fetchSchools(): Promise<School[]> {
    // Return cached data if already fetched
    if (this.schools.length > 0) {
      return this.schools;
    }

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure data is an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: expected an array');
      }
      // Remove duplicates based on school number
      const uniqueSchools = data.filter((school: School, index: number, self: School[]) => 
        index === self.findIndex(s => s['SCHOOL NO.'] === school['SCHOOL NO.'])
      );
      this.schools = uniqueSchools;
      return this.schools;
    } catch (error) {
      console.error('Error fetching schools:', error);
      throw error;
    }
  }

  getSchools(): School[] {
    return this.schools;
  }

  filterSchools(filters: { level?: string; category?: string; district?: string; session?: string; studentsGender?: string }): School[] {
    return this.schools.filter(school => {
      if (filters.level && filters.level !== 'all') {
        const levelMatch = school['SCHOOL LEVEL'] === filters.level;
        if (!levelMatch) return false;
      }

      if (filters.category && filters.category !== 'all') {
        const categoryMatch = school['FINANCE TYPE'] === filters.category;
        if (!categoryMatch) return false;
      }

      if (filters.district && filters.district !== 'all') {
        const districtMatch = school.DISTRICT === filters.district;
        if (!districtMatch) return false;
      }

      if (filters.session && filters.session !== 'all') {
        const sessionMatch = school.SESSION === filters.session;
        if (!sessionMatch) return false;
      }

      if (filters.studentsGender && filters.studentsGender !== 'all') {
        const genderMatch = school['STUDENTS GENDER'] === filters.studentsGender;
        if (!genderMatch) return false;
      }

      return true;
    });
  }
}