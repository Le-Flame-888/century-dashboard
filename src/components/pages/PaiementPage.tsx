import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

// Mock student payment data
interface StudentPayment {
  id: string;
  fullName: string;
  parentName: string;
  parentPhone: string;
  dueDate: string; // YYYY-MM-DD
  paid: boolean;
}

const initialPayments: StudentPayment[] = [
  {
    id: '1',
    fullName: 'Ali Ben Salah',
    parentName: 'M. Ben Salah',
    parentPhone: '+212 600 111 222',
    dueDate: '2025-08-03',
    paid: false,
  },
  {
    id: '2',
    fullName: 'Sofia El Amrani',
    parentName: 'Mme El Amrani',
    parentPhone: '+212 600 333 444',
    dueDate: '2025-08-10',
    paid: true,
  },
  {
    id: '3',
    fullName: 'Youssef Chami',
    parentName: 'M. Chami',
    parentPhone: '+212 600 555 666',
    dueDate: '2025-07-28',
    paid: false,
  },
];

const TODAY = new Date('2025-08-01T14:25:38+01:00'); // Use system-provided current time

function daysUntil(dateStr: string): number {
  const due = new Date(dateStr);
  const diff = due.getTime() - TODAY.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const PaiementPage: React.FC = () => {
  const [payments, setPayments] = useState<StudentPayment[]>(initialPayments);
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState<StudentPayment[]>([]);
  const [overdue, setOverdue] = useState<StudentPayment[]>([]);

  useEffect(() => {
    // Alert if payment due within 3 days
    setAlerts(
      payments.filter(p => !p.paid && daysUntil(p.dueDate) >= 0 && daysUntil(p.dueDate) <= 3)
    );
    // Overdue if due date passed and not paid
    setOverdue(
      payments.filter(p => !p.paid && daysUntil(p.dueDate) < 0)
    );
  }, [payments]);

  const filteredPayments = payments.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <AlertTriangle className="text-yellow-500 w-6 h-6" /> Gestion des paiements
      </h1>

      {/* Alerts for upcoming payments */}
      {alerts.length > 0 && (
        <div className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <h2 className="font-semibold mb-2">Paiements à venir</h2>
          <ul className="space-y-1">
            {alerts.map(s => (
              <li key={s.id} className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span>
                  <b>{s.fullName}</b> doit payer avant le <b>{s.dueDate}</b>.
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Overdue payments */}
      {overdue.length > 0 && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <h2 className="font-semibold mb-2">Paiements en retard</h2>
          <ul className="space-y-2">
            {overdue.map(s => (
              <li key={s.id} className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
                <span>
                  <b>{s.fullName}</b> n'a pas payé. Appeler le parent <b>{s.parentName}</b> au <b>{s.parentPhone}</b> pour continuer la formation.
                </span>
                <Button variant="outline" className="flex items-center gap-2" onClick={() => window.open(`tel:${s.parentPhone}`)}>
                  <Phone className="w-4 h-4" /> Appeler le parent
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Search and table */}
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="Rechercher un étudiant..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2 px-4">Nom complet</th>
              <th className="text-left py-2 px-4">Parent</th>
              <th className="text-left py-2 px-4">Téléphone Parent</th>
              <th className="text-left py-2 px-4">Date limite</th>
              <th className="text-left py-2 px-4">Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(s => (
              <tr key={s.id} className="border-t">
                <td className="py-2 px-4">{s.fullName}</td>
                <td className="py-2 px-4">{s.parentName}</td>
                <td className="py-2 px-4">{s.parentPhone}</td>
                <td className="py-2 px-4">{s.dueDate}</td>
                <td className="py-2 px-4">
                  {s.paid ? (
                    <span className="text-green-600 font-semibold">Payé</span>
                  ) : daysUntil(s.dueDate) < 0 ? (
                    <span className="text-red-600 font-semibold">En retard</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">À venir</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaiementPage;
