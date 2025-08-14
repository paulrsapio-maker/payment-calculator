import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, FileText, User, Download, Lock, Unlock } from 'lucide-react';
import html2pdf from 'html2pdf.js';

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

  const handleSavePDF = async () => {
    // Create a hidden div with the content to print
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
          <h1 style="color: #1f2937; margin: 0; font-size: 28px;">Payment Plan Summary</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Multi-Campus Educational System</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="flex: 1;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Student Information</h2>
            <p><strong>Name:</strong> ${studentInfo.name || 'Not specified'}</p>
            <p><strong>Email:</strong> ${studentInfo.email || 'Not specified'}</p>
            <p><strong>Admissions Rep:</strong> ${studentInfo.admissionsRep || 'Not specified'}</p>
            <p><strong>Financial Aid Officer:</strong> ${studentInfo.financialAidOfficer || 'Not specified'}</p>
          </div>
          <div style="flex: 1; margin-left: 40px;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px;">Program Details</h2>
            <p><strong>Campus:</strong> ${campusInfo.campus || 'Not selected'}</p>
            <p><strong>Program:</strong> ${campusInfo.program || 'Not selected'}</p>
            <p><strong>Tuition:</strong> ${formatCurrency(tuition)}</p>
            <p><strong>Total Financial Aid:</strong> ${formatCurrency(totalFinancialAid)}</p>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Financial Summary</h2>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span><strong>Total Balance:</strong></span>
            <span>${formatCurrency(activeBalance)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span><strong>Down Payment (${downPaymentPercentage.toFixed(1)}%):</strong></span>
            <span style="color: #7c3aed;">-${formatCurrency(downPayment)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; border-top: 2px solid #e5e7eb; padding-top: 10px;">
            <span>Amount to Finance:</span>
            <span style="color: #2563eb;">${formatCurrency(financeAmount)}</span>
          </div>
        </div>
        
        ${paymentPlans.length > 0 ? `
          <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Payment Plan Options</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 11px;">
            <thead>
              <tr style="background-color: #f3f4f6; border-bottom: 2px solid #d1d5db;">
                <th style="padding: 8px; text-align: left; font-weight: bold; color: #374151; border-right: 1px solid #d1d5db;">Plan</th>
                <th style="padding: 8px; text-align: center; font-weight: bold; color: #374151; border-right: 1px solid #d1d5db;">Interest Rate</th>
                <th style="padding: 8px; text-align: center; font-weight: bold; color: #374151; border-right: 1px solid #d1d5db;">Monthly Payment</th>
                <th style="padding: 8px; text-align: center; font-weight: bold; color: #374151; border-right: 1px solid #d1d5db;">Total Amount</th>
                <th style="padding: 8px; text-align: center; font-weight: bold; color: #374151;">Total Interest</th>
              </tr>
            </thead>
            <tbody>
              ${paymentPlans.map((plan, index) => `
                <tr style="border-bottom: 1px solid #e5e7eb; ${plan.isManuallyOverridden ? 'background-color: #faf5ff;' : ''}">
                  <td style="padding: 10px; border-right: 1px solid #e5e7eb; color: #374151;">
                    <div style="font-weight: bold; margin-bottom: 2px;">${plan.description}</div>
                    ${plan.isManuallyOverridden ? '<div style="background-color: #7c3aed; color: white; font-size: 8px; font-weight: bold; padding: 2px 4px; border-radius: 2px; display: inline-block;">🔧 CUSTOM RATE</div>' : ''}
                  </td>
                  <td style="padding: 10px; text-align: center; border-right: 1px solid #e5e7eb; font-weight: bold; color: ${plan.isZeroInterest ? '#10b981' : '#1e40af'};">${plan.interestRate}%</td>
                  <td style="padding: 10px; text-align: center; border-right: 1px solid #e5e7eb; font-weight: bold; color: #2563eb; font-size: 13px;">${formatCurrency(plan.monthlyPayment)}</td>
                  <td style="padding: 10px; text-align: center; border-right: 1px solid #e5e7eb; color: #374151;">${formatCurrency(plan.totalAmount)}</td>
                  <td style="padding: 10px; text-align: center; color: ${plan.totalInterest > 0 ? '#f59e0b' : '#10b981'};">
                    ${plan.totalInterest > 0 ? formatCurrency(plan.totalInterest) : 'None'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : `
          <div style="text-align: center; padding: 40px; color: #6b7280;">
            <p style="font-size: 16px;">No payment plans available. Please select a program and ensure there is an amount to finance.</p>
          </div>
        `}
        
        <div style="margin-top: 50px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <h3 style="color: #374151; font-size: 16px; margin-bottom: 30px; text-align: center;">Signatures</h3>
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div style="flex: 1; margin-right: 40px;">
              <div style="border-bottom: 2px solid #000; margin-bottom: 8px; height: 40px;"></div>
              <div style="text-align: center;">
                <p style="margin: 0; font-weight: bold; color: #374151;">Student Signature</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">${studentInfo.name || '_'.repeat(30)}</p>
              </div>
            </div>
            <div style="flex: 1; margin-left: 40px;">
              <div style="border-bottom: 2px solid #000; margin-bottom: 8px; height: 40px;"></div>
              <div style="text-align: center;">
                <p style="margin: 0; font-weight: bold; color: #374151;">Campus Representative</p>
                <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">${studentInfo.admissionsRep || '_'.repeat(30)}</p>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
            <div style="flex: 1; margin-right: 40px;">
              <div style="border-bottom: 1px solid #6b7280; margin-bottom: 5px; height: 25px;"></div>
              <div style="text-align: center; font-size: 12px; color: #6b7280;">
                Date
              </div>
            </div>
            <div style="flex: 1; margin-left: 40px;">
              <div style="border-bottom: 1px solid #6b7280; margin-bottom: 5px; height: 25px;"></div>
              <div style="text-align: center; font-size: 12px; color: #6b7280;">
                Date
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>This payment plan is subject to terms and conditions. Please contact your financial aid office for complete details.</p>
          <p style="margin-top: 15px; font-style: italic;">By signing above, both parties acknowledge receipt and review of this payment plan summary.</p>
        </div>
      </div>
    `;

    const opt = {
      margin: 0.5,
      filename: `Payment_Plan_${studentInfo.name || 'Student'}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-t-4 border-blue-600">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Payment Plan Calculator</h1>
                <p className="text-gray-600 mt-1">Multi-Campus Educational System</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleEmail} 
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 shadow-md"
              >
                <User className="h-4 w-4" />
                Email
              </button>
              <button 
                onClick={handleSavePDF} 
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 gap-2 shadow-md"
              >
                <Download className="h-4 w-4" />
                Save PDF
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Campus & Program Selection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campus:</label>
              <select 
                value={campusInfo.campus} 
                onChange={(e) => handleCampusInfoChange('campus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">-- Select Campus --</option>
                {programDB.campuses.map(campus => (
                  <option key={campus.id} value={campus.name}>{campus.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program:</label>
              <select 
                value={campusInfo.program} 
                onChange={(e) => handleCampusInfoChange('program', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                disabled={!campusInfo.campus}
              >
                <option value="">-- Select Program --</option>
                {getProgramsByCampus(campusInfo.campus).map(program => (
                  <option key={program.name} value={program.name}>{program.name} ({program.duration})</option>
                ))}
              </select>
            </div>
          </div>
          {campusInfo.campus && campusInfo.program && getProgramDetails(campusInfo.program, campusInfo.campus) && (
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
              <div className="text-sm text-gray-700">
                <div className="font-semibold text-gray-800 mb-2">Selected Program Details:</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="font-medium">Program:</span> {campusInfo.program}
                  </div>
                  <div>
                    <span className="font-medium">Campus:</span> {campusInfo.campus}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {getProgramDetails(campusInfo.program, campusInfo.campus).duration}
                  </div>
                </div>
                <div className="mt-3 p-2 bg-emerald-100 rounded-md">
                  <span className="text-emerald-700 font-semibold text-sm">✨ 0% interest available for {getProgramDetails(campusInfo.program, campusInfo.campus).months}-month plan!</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Student Information
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Student Name" 
                value={studentInfo.name} 
                onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={studentInfo.email}
                onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
              <input 
                type="text" 
                placeholder="Admissions Representative" 
                value={studentInfo.admissionsRep}
                onChange={(e) => setStudentInfo({...studentInfo, admissionsRep: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
              <input 
                type="text" 
                placeholder="Financial Aid Officer" 
                value={studentInfo.financialAidOfficer}
                onChange={(e) => setStudentInfo({...studentInfo, financialAidOfficer: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Financial Aid
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pell Grant:</label>
                <input 
                  type="number" 
                  value={financialAid.pellGrant}
                  onChange={(e) => setFinancialAid({...financialAid, pellGrant: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Federal Loans:</label>
                <input 
                  type="number" 
                  value={financialAid.federalLoans}
                  onChange={(e) => setFinancialAid({...financialAid, federalLoans: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Funding:</label>
                <input 
                  type="number" 
                  value={financialAid.additionalFunding}
                  onChange={(e) => setFinancialAid({...financialAid, additionalFunding: parseFloat(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                />
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Financial Aid:</span>
                  <span className="text-emerald-600">{formatCurrency(totalFinancialAid)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Costs & Balance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tuition:</label>
                <input 
                  type="number" 
                  value={tuition} 
                  onChange={(e) => setTuition(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Balance (Override):</label>
                <input 
                  type="number" 
                  value={balance} 
                  onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                  placeholder={calculatedBalance.toString()} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment Amount:</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-gray-500">$</span>
                  <input 
                    type="number" 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="0.00"
                    step="100"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 text-lg">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Balance:</span>
                    <span className="font-medium">{formatCurrency(activeBalance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment ({downPaymentPercentage.toFixed(1)}%):</span>
                    <span className="font-medium text-purple-600">-{formatCurrency(downPayment)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-xl">
                      <span>To Finance:</span>
                      <span className="text-blue-600">{formatCurrency(financeAmount)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-sm text-gray-600 mb-2">Down Payment Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                      style={{ width: `${Math.min(downPaymentPercentage, 100)}%` }}
                    >
                      {downPaymentPercentage > 15 && (
                        <span className="text-white text-xs font-semibold">
                          {downPaymentPercentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                  {downPaymentPercentage <= 15 && downPaymentPercentage > 0 && (
                    <div className="text-xs text-purple-600 font-semibold mt-1">
                      {downPaymentPercentage.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Plans</h2>
          
          {/* Rate Override Section */}
          <div className="mb-6">
            {!rateOverrideEnabled ? (
              <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-gray-100">
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <button 
                    onClick={handlePasswordSubmit}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm transition-colors duration-200"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-emerald-400 rounded-lg p-4 bg-gradient-to-r from-emerald-50 to-green-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Unlock className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-sm font-semibold text-emerald-800">Rate Override Active</h3>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={lockOverrides}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                    >
                      Lock & Save
                    </button>
                    <button 
                      onClick={clearAndLockOverrides}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors duration-200"
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
                        <div key={index} className="bg-white p-3 rounded border border-emerald-300 shadow-sm">
                          <div className="text-xs font-medium text-gray-600 mb-1">
                            {plan.months} Month Plan
                          </div>
                          <div className="text-xs text-gray-500 mb-2">
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
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {paymentPlans.map((plan, index) => (
                <div key={index} className={`border-2 rounded-xl p-5 transition-all duration-200 hover:shadow-lg min-h-[280px] flex flex-col ${
                  plan.isZeroInterest 
                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50 shadow-md' 
                    : plan.isManuallyOverridden 
                    ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}>
                  {plan.isZeroInterest && (
                    <div className="text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-green-500 rounded-full px-3 py-1 mb-3 text-center shadow-sm">
                      ✨ 0% INTEREST
                    </div>
                  )}
                  {plan.isManuallyOverridden && (
                    <div className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1 mb-3 text-center shadow-sm">
                      🔧 CUSTOM RATE
                    </div>
                  )}
                  <h3 className="font-semibold text-sm text-gray-800 mb-3 text-center leading-tight">{plan.description}</h3>
                  <div className={`text-xs font-medium px-3 py-2 rounded-lg text-center mb-4 ${
                    plan.isManuallyOverridden 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {plan.interestRate}% APR
                  </div>
                  <div className="text-2xl font-bold text-blue-600 text-center mb-1">{formatCurrency(plan.monthlyPayment)}</div>
                  <div className="text-xs text-gray-500 text-center mb-4">per month</div>
                  <div className="mt-auto text-xs text-gray-500 border-t pt-3">
                    <div className="flex justify-between mb-1">
                      <span>Total:</span>
                      <span className="font-medium">{formatCurrency(plan.totalAmount)}</span>
                    </div>
                    {plan.totalInterest > 0 && (
                      <div className="flex justify-between">
                        <span>Interest:</span>
                        <span className="text-orange-500 font-medium">{formatCurrency(plan.totalInterest)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {activeBalance > 0 && financeAmount === 0 ? (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-xl border border-emerald-200">
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-xl font-semibold text-emerald-600 mb-2">Congratulations!</p>
                  <p className="text-gray-600">Your down payment covers the entire balance!</p>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <div className="text-4xl mb-4">🎓</div>
                  <p className="text-lg font-medium text-gray-600">Select a program to see payment plan options</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlanCalculator;
