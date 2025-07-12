export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar?: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Qualification {
  id: string;
  subject: string;
  level: string;
  privateRate: number;
  groupRate: number;
  certified: boolean;
  certificationDate?: string;
}

export interface ScheduleSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'available' | 'booked' | 'blocked';
  studentName?: string;
  subject?: string;
  lessonType: 'private' | 'group';
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  studentName: string;
  subject: string;
  lessonType: 'private' | 'group';
  status: 'completed' | 'pending' | 'cancelled';
  method: 'card' | 'bank_transfer' | 'cash';
}

export interface TeacherStats {
  totalEarnings: number;
  monthlyEarnings: number;
  totalLessons: number;
  upcomingLessons: number;
  studentCount: number;
  averageRating: number;
}