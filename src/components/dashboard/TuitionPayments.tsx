import { CreditCard, MoreVertical } from 'lucide-react';

const payments = [
  {
    id: 1,
    studentName: 'Yahya Oussou',
    courseName: 'Mathématiques',
    dueDate: '29/08/2025',
    amount: 150,
    status: 'en attente',
  },
  {
    id: 2,
    studentName: 'Yassine Oussou',
    courseName: 'Physique',
    dueDate: '15/08/2025',
    amount: 120,
    status: 'en attente',
  },
  {
    id: 3,
    studentName: 'Younes Oussou',
    courseName: 'Développement Web',
    dueDate: '01/08/2025',
    amount: 250,
    status: 'payé',
  },
];

const TuitionPayments = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Paiements des Formations</h3>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Étudiant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Formation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Échéance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full ${payment.status === 'payé' ? 'bg-green-100' : 'bg-orange-100'}`}>
                      <CreditCard className={`h-5 w-5 ${payment.status === 'payé' ? 'text-green-600' : 'text-orange-600'}`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{payment.studentName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{payment.courseName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{payment.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{payment.amount} DH</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === 'payé' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {payment.status === 'en attente' && (
                    <button className="text-white bg-green-600 hover:bg-green-700 hover:text-white px-3 py-1 rounded-md">
                      Payer
                    </button>
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

export default TuitionPayments;
