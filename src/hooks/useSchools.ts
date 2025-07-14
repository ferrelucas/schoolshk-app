import { useState, useEffect } from 'react';
import type { School } from '../types/school';
import { SchoolService } from '../services/schoolService';

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const schoolService = SchoolService.getInstance();
        const data = await schoolService.fetchSchools();
        setSchools(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return { schools, loading, error };
};