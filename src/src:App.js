import React, { useState, useEffect } from 'react';
import './App.css';

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
    plan1: null, plan2: null, plan3: null, plan4: null, plan5: null
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
      plan1: null, plan2: null, plan3: null, plan4: null, plan5: null
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

  const handleSavePDF = async () => {
    // Simple PDF generation using window.print
    const printContent = `
      <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
          <h1 style="color: #1f2937; margin: 0; font-size: 28px;">Payment Plan Summary</h1>
          <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">Mikhail Education Corp</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="flex: 1;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Student Information</h2>
            <p><strong>Name:</strong> ${studentInfo.name || 'Not specified'}</p>
            <p><strong>Email:</strong> ${studentInfo.email || 'Not specified'}</p>
            <p><strong>Admissions Rep:</strong> ${studentInfo.admissionsRep || 'Not specified'}</p>
            <p><strong>Financial Aid Officer:</strong> ${studentInfo.financialAidOfficer || 'Not specified'}</p>
          </div>
          <div style="flex: 1; margin-left: 40px;">
            <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Program Details</h2>
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
        ` : ''}
        
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
              <div style="text-align: center; font-size: 12px; color: #6b7280;">Date</div>
            </div>
            <div style="flex: 1; margin-left: 40px;">
              <div style="border-bottom: 1px solid #6b7280; margin-bottom: 5px; height: 25px;"></div>
              <div style="text-align: center; font-size: 12px; color: #6b7280;">Date</div>
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

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="header-card">
          <div className="header-content">
            <div className="header-left">
              <div className="icon-container">
                <span className="calculator-icon">🧮</span>
              </div>
              <div>
                <h1 className="main-title">Payment Plan Calculator</h1>
                <p className="subtitle">Mikhail Education Corp</p>
              </div>
            </div>
            <div className="header-actions">
              <button onClick={handleSavePDF} className="pdf-button">
                📄 Save PDF
              </button>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">📅 Campus & Program Selection</h2>
          <div className="two-column-grid">
            <div>
              <label className="input-label">Campus:</label>
              <select 
                value={campusInfo.campus} 
                onChange={(e) => handleCampusInfoChange('campus', e.target.value)}
                className="form-select"
              >
                <option value="">-- Select Campus --</option>
                {programDB.campuses.map(campus => (
                  <option key={campus.id} value={campus.name}>{campus.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="input-label">Program:</label>
              <select 
                value={campusInfo.program} 
                onChange={(e) => handleCampusInfoChange('program', e.target.value)}
                className="form-select"
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
            <div className="program-info">
              <div className="program-details">
                <div><strong>Program:</strong> {campusInfo.program}</div>
                <div><strong>Campus:</strong> {campusInfo.campus}</div>
                <div><strong>Duration:</strong> {getProgramDetails(campusInfo.program, campusInfo.campus).duration}</div>
                <div className="zero-interest-note">
                  ✨ 0% interest available for {getProgramDetails(campusInfo.program, campusInfo.campus).months}-month plan!
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="two-column-grid">
          <div className="section-card">
            <h2 className="section-title">👤 Student Information</h2>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Student Name" 
                value={studentInfo.name} 
                onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                className="form-input" 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={studentInfo.email}
                onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                className="form-input" 
              />
              <input 
                type="text" 
                placeholder="Admissions Representative" 
                value={studentInfo.admissionsRep}
                onChange={(e) => setStudentInfo({...studentInfo, admissionsRep: e.target.value})}
                className="form-input" 
              />
              <input 
                type="text" 
                placeholder="Financial Aid Officer" 
                value={studentInfo.financialAidOfficer}
                onChange={(e) => setStudentInfo({...studentInfo, financialAidOfficer: e.target.value})}
                className="form-input" 
              />
            </div>
          </div>

          <div className="section-card">
            <h2 className="section-title">💰 Financial Aid</h2>
            <div className="form-group">
              <div>
                <label className="input-label">Pell Grant:</label>
                <input 
                  type="number" 
                  value={financialAid.pellGrant}
                  onChange={(e) => setFinancialAid({...financialAid, pellGrant: parseFloat(e.target.value) || 0})}
                  className="form-input" 
                />
              </div>
              <div>
                <label className="input-label">Federal Loans:</label>
                <input 
                  type="number" 
                  value={financialAid.federalLoans}
                  onChange={(e) => setFinancialAid({...financialAid, federalLoans: parseFloat(e.target.value) || 0})}
                  className="form-input" 
                />
              </div>
              <div>
                <label className="input-label">Additional Funding:</label>
                <input 
                  type="number" 
                  value={financialAid.additionalFunding}
                  onChange={(e) => setFinancialAid({...financialAid, additionalFunding: parseFloat(e.target.value) || 0})}
                  className="form-input" 
                />
              </div>
              <div className="total-aid">
                <div className="total-aid-row">
                  <span>Total Financial Aid:</span>
                  <span className="total-amount">{formatCurrency(totalFinancialAid)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">📄 Costs & Balance</h2>
          <div className="two-column-grid">
            <div className="form-group">
              <div>
                <label className="input-label">Tuition:</label>
                <input 
                  type="number" 
                  value={tuition} 
                  onChange={(e) => setTuition(parseFloat(e.target.value) || 0)}
                  className="form-input" 
                />
              </div>
              <div>
                <label className="input-label">Balance (Override):</label>
                <input 
                  type="number" 
                  value={balance} 
                  onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                  className="form-input" 
                  placeholder={calculatedBalance.toString()} 
                />
              </div>
              <div>
                <label className="input-label">Down Payment Amount:</label>
                <div className="currency-input">
                  <span className="currency-symbol">$</span>
                  <input 
                    type="number" 
                    value={downPayment} 
                    onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                    className="form-input-currency"
                    placeholder="0.00"
                    step="100"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="payment-summary">
                <h3 className="summary-title">Payment Summary</h3>
                <div className="summary-item">
                  <span>Balance:</span>
                  <span>{formatCurrency(activeBalance)}</span>
                </div>
                <div className="summary-item">
                  <span>Down Payment ({downPaymentPercentage.toFixed(1)}%):</span>
                  <span className="down-payment">-{formatCurrency(downPayment)}</span>
                </div>
                <div className="summary-total">
                  <span>To Finance:</span>
                  <span className="finance-amount">{formatCurrency(financeAmount)}</span>
                </div>
                
                <div className="progress-section">
                  <div className="progress-label">Down Payment Progress</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${Math.min(downPaymentPercentage, 100)}%` }}
                    >
                      {downPaymentPercentage > 15 && (
                        <span className="progress-text">
                          {downPaymentPercentage.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                  {downPaymentPercentage <= 15 && downPaymentPercentage > 0 && (
                    <div className="progress-small-text">
                      {downPaymentPercentage.toFixed(1)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">Payment Plans</h2>
          
          {/* Rate Override Section */}
          <div className="override-section">
            {!rateOverrideEnabled ? (
              <div className="override-locked">
                <div className="override-header">
                  <span className="lock-icon">🔒</span>
                  <h3>Manual Rate Override (Admin Only)</h3>
                </div>
                <div className="override-form">
                  <input 
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                    placeholder="Enter password to unlock"
                    className="password-input"
                  />
                  <button 
                    onClick={handlePasswordSubmit}
                    className="unlock-button"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            ) : (
              <div className="override-active">
                <div className="override-active-header">
                  <div className="override-title">
                    <span className="unlock-icon">🔓</span>
                    <h3>Rate Override Active</h3>
                  </div>
                  <div className="override-actions">
                    <button onClick={lockOverrides} className="lock-save-button">
                      Lock & Save
                    </button>
                    <button onClick={clearAndLockOverrides} className="clear-button">
                      Clear All
                    </button>
                  </div>
                </div>
                {paymentPlans.length > 0 && (
                  <div className="override-inputs">
                    {paymentPlans.map((plan, index) => {
                      const program = getProgramDetails(campusInfo.program, campusInfo.campus);
                      const defaultRate = program ? calculateInterestRate(
                        program.months,
                        plan.months,
                        downPaymentPercentage
                      ) : 0;
                      
                      return (
                        <div key={index} className="override-input-group">
                          <div className="override-plan-title">
                            {plan.months} Month Plan
                          </div>
                          <div className="override-default-rate">
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
                            className="override-rate-input"
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
            <div className="payment-plans-grid">
              {paymentPlans.map((plan, index) => (
                <div key={index} className={`payment-plan-card ${plan.isZeroInterest ? 'zero-interest' : ''} ${plan.isManuallyOverridden ? 'custom-rate' : ''}`}>
                  {plan.isZeroInterest && (
                    <div className="badge zero-interest-badge">
                      ✨ 0% INTEREST
                    </div>
                  )}
                  {plan.isManuallyOverridden && (
                    <div className="badge custom-rate-badge">
                      🔧 CUSTOM RATE
                    </div>
                  )}
                  <h3 className="plan-title">{plan.description}</h3>
                  <div className={`interest-rate ${plan.isManuallyOverridden ? 'custom-rate-text' : ''}`}>
                    {plan.interestRate}% APR
                  </div>
                  <div className="monthly-payment">{formatCurrency(plan.monthlyPayment)}</div>
                  <div className="payment-frequency">per month</div>
                  <div className="plan-totals">
                    <div className="total-row">
                      <span>Total:</span>
                      <span>{formatCurrency(plan.totalAmount)}</span>
                    </div>
                    {plan.totalInterest > 0 && (
                      <div className="interest-row">
                        <span>Interest:</span>
                        <span>{formatCurrency(plan.totalInterest)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-plans">
              {activeBalance > 0 && financeAmount === 0 ? (
                <div className="congratulations">
                  <div className="congrats-icon">🎉</div>
                  <p className="congrats-title">Congratulations!</p>
                  <p>Your down payment covers the entire balance!</p>
                </div>
              ) : (
                <div className="select-program">
                  <div className="program-icon">🎓</div>
                  <p>Select a program to see payment plan options</p>
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

Step 2: Create/Replace your src/App.css with this styling:

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.header-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  border-top: 4px solid #2563eb;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.header-left {
  display: flex;
  align-items: center;
}

.icon-container {
  background-color: #dbeafe;
  padding: 12px;
  border-radius: 8px;
  margin-right: 16px;
}

.calculator-icon {
  font-size: 32px;
}

.main-title {
  font-size: 30px;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.subtitle {
  color: #6b7280;
  margin: 4px 0 0 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.pdf-button {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pdf-button:hover {
  background-color: #1d4ed8;
}

.section-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.two-column-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .two-column-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-select,
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-select:focus,
.form-input:focus {
  outline: none;
  ring: 2px;
  ring-color: #2563eb;
  border-color: transparent;
}

.form-select:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.program-info {
  margin-top: 24px;
  padding: 16px;
  background: linear-gradient(135deg, #ecfdf5 0%, #dbeafe 100%);
  border-radius: 8px;
  border: 1px solid #10b981;
}

.program-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  font-size: 14px;
  color: #374151;
}

.zero-interest-note {
  grid-column: 1 / -1;
  margin-top: 12px;
  padding: 8px;
  background-color: #10b981;
  color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
}

.total-aid {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.total-aid-row {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 18px;
}

.total-amount {
  color: #10b981;
}

.currency-input {
  position: relative;
}

.currency-symbol {
  position: absolute;
  left: 16px;
  top: 13px;
  color: #6b7280;
}

.form-input-currency {
  width: 100%;
  padding: 12px 16px 12px 32px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-input-currency:focus {
  outline: none;
  ring: 2px;
  ring-color: #7c3aed;
  border-color: transparent;
}

.payment-summary {
  background: linear-gradient(135deg, #f9fafb 0%, #dbeafe 100%);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.summary-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  font-size: 18px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.down-payment {
  font-weight: 500;
  color: #7c3aed;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 20px;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
}

.finance-amount {
  color: #2563eb;
}

.progress-section {
  margin-top: 24px;
}

.progress-label {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}

.progress-bar {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 6px;
  height: 12px;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #7c3aed 0%, #8b5cf6 100%);
  height: 12px;
  border-radius: 6px;
  transition: width 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
}

.progress-text {
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.progress-small-text {
  font-size: 12px;
  color: #7c3aed;
  font-weight: 600;
  margin-top: 4px;
}

.override-section {
  margin-bottom: 24px;
}

.override-locked {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: linear-gradient(90deg, #f9fafb 0%, #f3f4f6 100%);
}

.override-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.override-header h3 {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.lock-icon {
  font-size: 20px;
}

.override-form {
  display: flex;
  gap: 8px;
}

.password-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.unlock-button {
  padding: 8px 16px;
  background-color: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.unlock-button:hover {
  background-color: #4b5563;
}

.override-active {
  border: 2px solid #10b981;
  border-radius: 8px;
  padding: 16px;
  background: linear-gradient(90deg, #ecfdf5 0%, #f0fdf4 100%);
}

.override-active-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.override-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.override-title h3 {
  font-size: 14px;
  font-weight: 600;
  color: #065f46;
  margin: 0;
}

.unlock-icon {
  font-size: 20px;
}

.override-actions {
  display: flex;
  gap: 8px;
}

.lock-save-button {
  padding: 4px 12px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.lock-save-button:hover {
  background-color: #1d4ed8;
}

.clear-button {
  padding: 4px 12px;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background-color: #b91c1c;
}

.override-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}

.override-input-group {
  background-color: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #10b981;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.override-plan-title {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.override-default-rate {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.override-rate-input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  box-sizing: border-box;
}

.override-rate-input:focus {
  outline: none;
  ring: 2px;
  ring-color: #10b981;
}

.payment-plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.payment-plan-card {
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  background-color: white;
}

.payment-plan-card:hover {
  box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
}

.payment-plan-card.zero-interest {
  border-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.payment-plan-card.custom-rate {
  border-color: #7c3aed;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.badge {
  font-size: 10px;
  font-weight: bold;
  padding: 6px 12px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 12px;
  color: white;
}

.zero-interest-badge {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.custom-rate-badge {
  background: linear-gradient(90deg, #7c3aed 0%, #6d28d9 100%);
  box-shadow: 0 2px 4px rgba(124, 58, 237, 0.3);
}

.plan-title {
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.3;
}

.interest-rate {
  font-size: 12px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
  background-color: #dbeafe;
  color: #1e40af;
}

.interest-rate.custom-rate-text {
  background-color: #ede9fe;
  color: #6d28d9;
}

.monthly-payment {
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
  text-align: center;
  margin-bottom: 4px;
}

.payment-frequency {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 16px;
}

.plan-totals {
  margin-top: auto;
  font-size: 12px;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
}

.total-row,
.interest-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.total-row span:last-child {
  font-weight: 500;
}

.interest-row span:last-child {
  color: #f59e0b;
  font-weight: 500;
}

.no-plans {
  text-align: center;
  padding: 48px;
  color: #6b7280;
}

.congratulations {
  background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #10b981;
}

.congrats-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.congrats-title {
  font-size: 20px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 8px;
}

.select-program {
  background-color: #f9fafb;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
}

.program-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.select-program p {
  font-size: 18px;
  font-weight: 500;
  color: #6b7280;
}

@media (max-width: 768px) {
  .main-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .payment-plans-grid {
    grid-template-columns: 1fr;
  }
  
  .override-inputs {
    grid-template-columns: 1fr;
  }
}
