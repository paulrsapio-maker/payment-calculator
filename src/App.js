import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, FileText, User, Download, Lock, Unlock } from 'lucide-react';

const PaymentPlanCalculator = () => {
  const [campusInfo, setCampusInfo] = useState({ campus: '', program: '' });
  const [studentInfo, setStudentInfo] = useState({
    name: '', email: '', admissionsRep: '', financialAidOfficer: '', efc: 'ESTIMATE'
  });
  const [tuition, setTuition] = useState(0);
  const [financialAid, setFinancialAid] = useState({
    pellGrant: 0, federalLoans: 0, additionalFunding: 0
  });
  const [costs] = useState({ laptopOptOut: 0, bookOptOut: 0 });
  const [balance, setBalance] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [paymentPlans, setPaymentPlans] = useState([]);
  
  // Rate override system
  const [rateOverrideEnabled, setRateOverrideEnabled] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [manualRates, setManualRates] = useState({
    plan1: null,
    plan2: null,
    plan3: null,
    plan4: null,
    plan5: null
  });
  const OVERRIDE_PASSWORD = 'mikhail2025';

  // Simplified database
  const programDB = {
    campuses: [
      { id: "lvc", name: "Las Vegas College (LVC)" },
      { id: "ibt", name: "Institute for Business and Technology (IBT)" },
      { id: "lamson", name: "Lamson Institute" },
      { id: "hci", name: "Houston Career Institute (HCI)" },
      { id: "nce", name: "National Career Education (NCE)" },
      { id: "ati", name: "Advanced Training Institute (ATI)" }
    ],
    programs: [
      // LVC
      { campusId: "lvc", name: "Accounting", duration: "18 months", weeks: 78, months: 18, tuitionCost: 29800 },
      { campusId: "lvc", name: "Cardiovascular Sonography", duration: "24 months", weeks: 104, months: 24, tuitionCost: 57889 },
      { campusId: "lvc", name: "Medical Assistant", duration: "9 months", weeks: 39, months: 9, tuitionCost: 14085 },
      { campusId: "lvc", name: "RN to BSN", duration: "15 months", weeks: 65, months: 15, tuitionCost: 13450 },
      { campusId: "lvc", name: "Practical Nurse", duration: "15 months", weeks: 65, months: 15, tuitionCost: 27775 },
      { campusId: "lvc", name: "Nursing", duration: "24 months", weeks: 104, months: 24, tuitionCost: 60600 },
      { campusId: "lvc", name: "Laboratory Assistant / EKG Technician / Phlebotomist", duration: "9 months", weeks: 39, months: 9, tuitionCost: 15600 },
      // IBT
      { campusId: "ibt", name: "Lab Assistant, EKG Technician/Phlebotomist", duration: "9 months", weeks: 39, months: 9, tuitionCost: 16280 },
      { campusId: "ibt", name: "Medical Assistant", duration: "9 months", weeks: 39, months: 9, tuitionCost: 15290 },
      { campusId: "ibt", name: "Automotive Technology", duration: "14 months", weeks: 61, months: 14, tuitionCost: 28090 },
      { campusId: "ibt", name: "Commercial Refrigeration, Heating and Air Conditioning", duration: "10 months", weeks: 43, months: 10, tuitionCost: 18700 },
      { campusId: "ibt", name: "Electrician (720 Clock Hours)", duration: "9 months", weeks: 39, months: 9, tuitionCost: 19195 },
      { campusId: "ibt", name: "Cardiovascular Sonography", duration: "24 months", weeks: 104, months: 24, tuitionCost: 61198 },
      // Lamson
      { campusId: "lamson", name: "Dental Assisting", duration: "11 months", weeks: 48, months: 11, tuitionCost: 18500 },
      { campusId: "lamson", name: "Lab Assistant, EKG Technician/Phlebotomist", duration: "9 months", weeks: 39, months: 9, tuitionCost: 16540 },
      { campusId: "lamson", name: "Medical Assistant", duration: "9 months", weeks: 39, months: 9, tuitionCost: 15790 },
      { campusId: "lamson", name: "Electrical Technician", duration: "9 months", weeks: 39, months: 9, tuitionCost: 17200 },
      { campusId: "lamson", name: "Commercial Refrigeration, Heating and Air Conditioning", duration: "10 months", weeks: 43, months: 10, tuitionCost: 18060 },
      { campusId: "lamson", name: "Personal Fitness Trainer", duration: "10 months", weeks: 43, months: 10, tuitionCost: 15300 },
      { campusId: "lamson", name: "Vocational Nursing", duration: "12 months", weeks: 52, months: 12, tuitionCost: 28095 },
      // HCI
      { campusId: "hci", name: "Dental Assisting", duration: "11 months", weeks: 48, months: 11, tuitionCost: 19010 },
      { campusId: "hci", name: "Laboratory Assistant/EKG Technician/Phlebotomist", duration: "9 months", weeks: 39, months: 9, tuitionCost: 15600 },
      { campusId: "hci", name: "Medical Assistant", duration: "9 months", weeks: 39, months: 9, tuitionCost: 14085 },
      { campusId: "hci", name: "Commercial Refrigeration, Heating and Air Conditioning", duration: "10 months", weeks: 43, months: 10, tuitionCost: 16585 },
      { campusId: "hci", name: "Electrical Technician", duration: "10 months", weeks: 43, months: 10, tuitionCost: 17290 },
      { campusId: "hci", name: "Surgical Technology", duration: "24 months", weeks: 104, months: 24, tuitionCost: 34424 },
      // NCE
      { campusId: "nce", name: "Commercial Refrigeration, Heating and Air Conditioning", duration: "10 months", weeks: 43, months: 10, tuitionCost: 16585 },
      { campusId: "nce", name: "Electrician (720 Clock Hours)", duration: "9 months", weeks: 39, months: 9, tuitionCost: 16584 },
      { campusId: "nce", name: "Lab Assistant, EKG Technician/Phlebotomist", duration: "9 months", weeks: 39, months: 9, tuitionCost: 14850 },
      { campusId: "nce", name: "Medical Assistant", duration: "9 months", weeks: 39, months: 9, tuitionCost: 14065 },
      // ATI
      { campusId: "ati", name: "Automotive Technology", duration: "14 months", weeks: 61, months: 14, tuitionCost: 24530 },
      { campusId: "ati", name: "HVAC/CR", duration: "10 months", weeks: 43, months: 10, tuitionCost: 17535 },
      { campusId: "ati", name: "Electrician (720 Clock Hours)", duration: "9 months", weeks: 39, months: 9, tuitionCost: 18457 },
      { campusId: "ati", name: "Personal Fitness Trainer", duration: "10 months", weeks: 43, months: 10, tuitionCost: 15170 }
    ]
  };

  const getProgramsByCampus = (campusName) => {
    const campus = programDB.campuses.find(c => c.name === campusName);
    return campus ? programDB.programs.filter(p => p.campusId === campus.id) : [];
  };

  const getProgramDetails = (programName, campusName) => {
    const campus = programDB.campuses.find(c => c.name === campusName);
    if (!campus) return null;
    return programDB.programs.find(p => p.name === programName && p.campusId === campus.id) || null;
  };

  const totalFinancialAid = financialAid.pellGrant + financialAid.federalLoans + financialAid.additionalFunding;
  const calculatedBalance = Math.max(0, tuition + costs.laptopOptOut + costs.bookOptOut - totalFinancialAid);
  const activeBalance = balance > 0 ? balance : calculatedBalance;
  const downPaymentPercentage = activeBalance === 0 ? 0 : Math.min((downPayment / activeBalance) * 100, 100);
  const financeAmount = Math.max(0, activeBalance - downPayment);

  useEffect(() => {
    if (calculatedBalance > 0) setBalance(calculatedBalance);
  }, [calculatedBalance]);

  const calculateInterestRate = (progMonths, termMonths, downPct) => {
    if (termMonths === progMonths) return 0;
    const monthsBeyond = termMonths - progMonths;
    let baseRate;
    if (monthsBeyond <= 12) {
      baseRate = 6.9;
    } else if (monthsBeyond <= 24) {
      baseRate = 7.9;
    } else if (monthsBeyond <= 36) {
      baseRate = 8.9;
    } else {
      baseRate = 9.9;
    }
    const discount = (downPct / 2) / 100;
    return Math.round(baseRate * (1 - discount) * 10) / 10;
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === OVERRIDE_PASSWORD) {
      setRateOverrideEnabled(true);
      setPasswordInput('');
    } else {
      alert('Incorrect password. Please try again.');
      setPasswordInput('');
    }
  };

  const handleRateOverride = (planIndex, value) => {
    const rate = value === '' || value === null ? null : parseFloat(value);
    setManualRates(prev => ({
      ...prev,
      [`plan${planIndex + 1}`]: rate
    }));
  };

  const lockOverrides = () => {
    setRateOverrideEnabled(false);
  };

  const clearAndLockOverrides = () => {
    setManualRates({
      plan1: null,
      plan2: null,
      plan3: null,
      plan4: null,
      plan5: null
    });
    setRateOverrideEnabled(false);
  };

  useEffect(() => {
    const program = getProgramDetails(campusInfo.program, campusInfo.campus);
    if (!program || financeAmount <= 0) {
      setPaymentPlans([]);
      return;
    }
    
    const terms = [program.months, program.months + 12, program.months + 24, program.months + 36, program.months + 48];
    const plans = terms.map((termMonths, index) => {
      const manualRateKey = `plan${index + 1}`;
      const manualRate = manualRates[manualRateKey];
      const hasManualRate = manualRate !== null && manualRate !== undefined && !isNaN(manualRate);
      const rate = hasManualRate ? manualRate : calculateInterestRate(program.months, termMonths, downPaymentPercentage);
      const monthlyRate = rate / 100 / 12;
      
      let monthlyPayment, totalAmount, totalInterest;
      if (rate === 0) {
        monthlyPayment = financeAmount / termMonths;
        totalAmount = financeAmount;
        totalInterest = 0;
      } else {
        monthlyPayment = financeAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                        (Math.pow(1 + monthlyRate, termMonths) - 1);
        totalAmount = monthlyPayment * termMonths;
        totalInterest = totalAmount - financeAmount;
      }
      
      return {
        months: termMonths,
        description: `${termMonths} Month Plan${index === 0 ? ' (Program Length)' : ` (+${termMonths - program.months} months)`}`,
        interestRate: rate,
        monthlyPayment: monthlyPayment,
        totalAmount: totalAmount,
        totalInterest: totalInterest,
        isZeroInterest: rate === 0,
        isManuallyOverridden: hasManualRate
      };
    });
    
    setPaymentPlans(plans);
  }, [campusInfo.program, campusInfo.campus, balance, tuition, totalFinancialAid, costs, downPayment, financeAmount, downPaymentPercentage, manualRates]);

  const handleCampusInfoChange = (field, value) => {
    setCampusInfo(prev => {
      const newInfo = { ...prev, [field]: value };
      if (field === 'campus') newInfo.program = '';
      if (field === 'program' && value) {
        const program = getProgramDetails(value, prev.campus);
        if (program) setTuition(program.tuitionCost);
      }
      return newInfo;
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleEmail = () => {
    const subject = `Payment Plan - ${studentInfo.name || 'Student'}`;
    const body = `Payment plan details for ${studentInfo.name || 'Student'}\n\nProgram: ${campusInfo.program}\nCampus: ${campusInfo.campus}\nTuition: ${formatCurrency(tuition)}\nFinancial Aid: ${formatCurrency(totalFinancialAid)}\nBalance: ${formatCurrency(activeBalance)}\nDown Payment: ${formatCurrency(downPayment)}\nTo Finance: ${formatCurrency(financeAmount)}`;
    window.location.href = `mailto:${studentInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSavePDF = () => {
    const htmlContent = `<!DOCTYPE html><html><head><title>Payment Plan</title></head><body>
      <h1>Payment Plan for ${studentInfo.name || 'Student'}</h1>
      <p>Program: ${campusInfo.program} at ${campusInfo.campus}</p>
      <p>Tuition: ${formatCurrency(tuition)}</p>
      <p>Financial Aid: ${formatCurrency(totalFinancialAid)}</p>
      <p>Balance: ${formatCurrency(activeBalance)}</p>
      <p>Down Payment: ${formatCurrency(downPayment)}</p>
      <p>To Finance: ${formatCurrency(financeAmount)}</p>
    </body></html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Payment_Plan_${studentInfo.name || 'Student'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Payment Plan Calculator</h1>
              <p className="text-gray-600">Multi-Campus System</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleEmail} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Email</button>
            <button onClick={handleSavePDF} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />Save HTML
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Campus & Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campus:</label>
            <select value={campusInfo.campus} onChange={(e) => handleCampusInfoChange('campus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">-- Select Campus --</option>
              {programDB.campuses.map(campus => (
                <option key={campus.id} value={campus.name}>{campus.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program:</label>
            <select value={campusInfo.program} onChange={(e) => handleCampusInfoChange('program', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={!campusInfo.campus}>
              <option value="">-- Select Program --</option>
              {getProgramsByCampus(campusInfo.campus).map(program => (
                <option key={program.name} value={program.name}>{program.name} ({program.duration})</option>
              ))}
            </select>
          </div>
        </div>
        {campusInfo.campus && campusInfo.program && getProgramDetails(campusInfo.program, campusInfo.campus) && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
            <div className="text-sm text-indigo-800">
              <strong>Selected:</strong> {campusInfo.program} at {campusInfo.campus}<br />
              <strong>Duration:</strong> {getProgramDetails(campusInfo.program, campusInfo.campus).duration}<br />
              <span className="text-green-600 font-semibold">✨ 0% interest available for {getProgramDetails(campusInfo.program, campusInfo.campus).months}-month plan!</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Info</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Student Name" value={studentInfo.name} 
              onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <input type="email" placeholder="Email" value={studentInfo.email}
              onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Admissions Rep" value={studentInfo.admissionsRep}
              onChange={(e) => setStudentInfo({...studentInfo, admissionsRep: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            <input type="text" placeholder="Financial Aid Officer" value={studentInfo.financialAidOfficer}
              onChange={(e) => setStudentInfo({...studentInfo, financialAidOfficer: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Financial Aid</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pell Grant:</label>
              <input type="number" value={financialAid.pellGrant}
                onChange={(e) => setFinancialAid({...financialAid, pellGrant: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Federal Loans:</label>
              <input type="number" value={financialAid.federalLoans}
                onChange={(e) => setFinancialAid({...financialAid, federalLoans: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Funding:</label>
              <input type="number" value={financialAid.additionalFunding}
                onChange={(e) => setFinancialAid({...financialAid, additionalFunding: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Aid:</span>
                <span className="text-green-600">{formatCurrency(totalFinancialAid)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Costs & Balance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tuition:</label>
              <input type="number" value={tuition} onChange={(e) => setTuition(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Balance (Override):</label>
              <input type="number" value={balance} onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder={calculatedBalance.toString()} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment Amount:</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input 
                  type="number" 
                  value={downPayment} 
                  onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                  step="100"
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-medium">{formatCurrency(activeBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment ({downPaymentPercentage.toFixed(1)}%):</span>
                  <span className="font-medium text-purple-600">-{formatCurrency(downPayment)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>To Finance:</span>
                    <span className="text-blue-600">{formatCurrency(financeAmount)}</span>
                  </div>
                </div>
              </div>
              
              {/* Down Payment Percentage Bar */}
              <div className="mt-4">
                <div className="text-xs text-gray-600 mb-1">Down Payment Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-6 rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${Math.min(downPaymentPercentage, 100)}%` }}
                  >
                    {downPaymentPercentage > 10 && (
                      <span className="text-white text-xs font-semibold">
                        {downPaymentPercentage.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Plans</h2>
        
        {/* Rate Override Section */}
        <div className="mb-6">
          {!rateOverrideEnabled ? (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="h-5 w-5 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-700">Manual Rate Override (Admin Only)</h3>
              </div>
              <div className="flex gap-2">
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  placeholder="Enter password to unlock"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <button 
                  onClick={handlePasswordSubmit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  Unlock
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-green-400 rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Unlock className="h-5 w-5 text-green-600" />
                  <h3 className="text-sm font-semibold text-green-800">Rate Override Active</h3>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={lockOverrides}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    Lock & Save
                  </button>
                  <button 
                    onClick={clearAndLockOverrides}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              {paymentPlans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {paymentPlans.map((plan, index) => {
                    const program = getProgramDetails(campusInfo.program, campusInfo.campus);
                    const defaultRate = program ? calculateInterestRate(
                      program.months,
                      plan.months,
                      downPaymentPercentage
                    ) : 0;
                    
                    return (
                      <div key={index} className="bg-white p-2 rounded border border-green-300">
                        <div className="text-xs font-medium text-gray-600 mb-1">
                          {plan.months} Month Plan
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          Default: {defaultRate}%
                        </div>
                        <input
                          type="number"
                          value={manualRates[`plan${index + 1}`] ?? ''}
                          onChange={(e) => handleRateOverride(index, e.target.value)}
                          placeholder="Override %"
                          step="0.1"
                          min="0"
                          max="99.9"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        
        {financeAmount > 0 && paymentPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {paymentPlans.map((plan, index) => (
              <div key={index} className={`border rounded-lg p-4 ${plan.isZeroInterest ? 'border-green-400 bg-green-50' : plan.isManuallyOverridden ? 'border-purple-400 bg-purple-50' : 'border-gray-200'}`}>
                {plan.isZeroInterest && <div className="text-xs font-bold text-white bg-green-500 rounded px-2 py-1 mb-2 text-center">✨ 0% INTEREST</div>}
                {plan.isManuallyOverridden && <div className="text-xs font-bold text-white bg-purple-500 rounded px-2 py-1 mb-2 text-center">🔧 CUSTOM RATE</div>}
                <h3 className="font-semibold text-sm text-gray-800">{plan.description}</h3>
                <div className={`text-xs font-medium px-2 py-1 rounded text-center my-2 ${
                  plan.isManuallyOverridden ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {plan.interestRate}% APR
                </div>
                <div className="text-xl font-bold text-blue-600 text-center">{formatCurrency(plan.monthlyPayment)}</div>
                <div className="text-xs text-gray-500 text-center">per month</div>
                <div className="text-xs text-gray-500 border-t pt-2 mt-2">
                  <div>Total: {formatCurrency(plan.totalAmount)}</div>
                  {plan.totalInterest > 0 && <div className="text-orange-500">Interest: {formatCurrency(plan.totalInterest)}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            {activeBalance > 0 && financeAmount === 0 ? (
              <div>
                <p className="text-lg font-semibold text-green-600 mb-2">🎉 Congratulations!</p>
                <p>Your down payment covers the entire balance!</p>
              </div>
            ) : (
              <p>Select a program to see payment plan options</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPlanCalculator;
