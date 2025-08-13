import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, FileText, User, Download } from 'lucide-react';

const PaymentPlanCalculator = () => {
  const [campusInfo, setCampusInfo] = useState({
    campus: '',
    program: ''
  });
  
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    admissionsRep: '',
    financialAidOfficer: '',
    efc: 'ESTIMATE'
  });

  const [tuition, setTuition] = useState(0);
  
  const [financialAid, setFinancialAid] = useState({
    pellGrant: 0,
    federalLoans: 0,
    additionalFunding: 0
  });

  const [costs, setCosts] = useState({
    laptopOptOut: 0,
    bookOptOut: 0
  });

  const [balance, setBalance] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  
  const [paymentPlans, setPaymentPlans] = useState([]);

  // Program database with all schools and programs
  const programDatabase = {
    lastUpdated: "2025-01-01",
    academicYear: "2025-2026",
    campuses: [
      {
        id: "lvc",
        name: "Las Vegas College (LVC)",
        active: true
      },
      {
        id: "ibt",
        name: "Institute for Business and Technology (IBT)",
        active: true
      },
      {
        id: "lamson",
        name: "Lamson Institute", 
        active: true
      },
      {
        id: "hci",
        name: "Houston Career Institute (HCI)",
        active: true
      },
      {
        id: "nce",
        name: "National Career Education (NCE)",
        active: true
      },
      {
        id: "ati",
        name: "Advanced Training Institute (ATI)",
        active: true
      }
    ],
    programs: [
      // Las Vegas College Programs
      {
        id: "accounting-lvc",
        campusId: "lvc",
        name: "Accounting",
        duration: "18 months",
        weeks: 78,
        months: 18,
        credits: 96,
        tuitionCost: 29800,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "cardiovascular-sonography-lvc",
        campusId: "lvc",
        name: "Cardiovascular Sonography",
        duration: "24 months",
        weeks: 104,
        months: 24,
        credits: 129,
        tuitionCost: 57889,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "medical-assistant-lvc",
        campusId: "lvc",
        name: "Medical Assistant",
        duration: "9 months",
        weeks: 39,
        months: 9,
        hours: 800,
        tuitionCost: 14085,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "rn-to-bsn-lvc",
        campusId: "lvc",
        name: "RN to BSN",
        duration: "15 months",
        weeks: 65,
        months: 15,
        credits: 90,
        tuitionCost: 13450,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "practical-nurse-lvc",
        campusId: "lvc",
        name: "Practical Nurse",
        duration: "15 months",
        weeks: 65,
        months: 15,
        credits: 55.5,
        tuitionCost: 27775,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "nursing-lvc",
        campusId: "lvc",
        name: "Nursing",
        duration: "24 months",
        weeks: 104,
        months: 24,
        credits: 108,
        tuitionCost: 60600,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "lab-assistant-ekg-phlebotomist-lvc",
        campusId: "lvc",
        name: "Laboratory Assistant / EKG Technician / Phlebotomist",
        duration: "9 months",
        weeks: 39,
        months: 9,
        hours: 800,
        tuitionCost: 15600,
        active: true,
        effectiveDate: "2025-01-01"
      },
      // IBT Programs
      {
        id: "lab-assistant-ekg-phlebotomist-ibt",
        campusId: "ibt",
        name: "Lab Assistant, EKG Technician/Phlebotomist",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 16280,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "medical-assistant-ibt",
        campusId: "ibt",
        name: "Medical Assistant",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 15290,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "automotive-technology-ibt",
        campusId: "ibt",
        name: "Automotive Technology",
        duration: "14 months",
        weeks: 61,
        months: 14,
        tuitionCost: 28090,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "commercial-refrigeration-hvac-ibt",
        campusId: "ibt",
        name: "Commercial Refrigeration, Heating and Air Conditioning",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 18700,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "electrician-720-ibt",
        campusId: "ibt",
        name: "Electrician (720 Clock Hours)",
        duration: "9 months",
        weeks: 39,
        months: 9,
        hours: 720,
        tuitionCost: 19195,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "cardiovascular-sonography-ibt",
        campusId: "ibt",
        name: "Cardiovascular Sonography",
        duration: "24 months",
        weeks: 104,
        months: 24,
        tuitionCost: 61198,
        active: true,
        effectiveDate: "2025-01-01"
      },
      // Lamson Institute Programs
      {
        id: "dental-assisting-lamson",
        campusId: "lamson",
        name: "Dental Assisting",
        duration: "11 months",
        weeks: 48,
        months: 11,
        tuitionCost: 18500,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "lab-assistant-ekg-phlebotomist-lamson",
        campusId: "lamson",
        name: "Lab Assistant, EKG Technician/Phlebotomist",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 16540,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "medical-assistant-lamson",
        campusId: "lamson",
        name: "Medical Assistant",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 15790,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "electrical-technician-lamson",
        campusId: "lamson",
        name: "Electrical Technician",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 17200,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "commercial-refrigeration-hvac-lamson",
        campusId: "lamson",
        name: "Commercial Refrigeration, Heating and Air Conditioning",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 18060,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "personal-fitness-trainer-lamson",
        campusId: "lamson",
        name: "Personal Fitness Trainer",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 15300,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "vocational-nursing-lamson",
        campusId: "lamson",
        name: "Vocational Nursing",
        duration: "12 months",
        weeks: 52,
        months: 12,
        tuitionCost: 28095,
        active: true,
        effectiveDate: "2025-01-01"
      },
      // HCI Programs
      {
        id: "dental-assisting-hci",
        campusId: "hci",
        name: "Dental Assisting",
        duration: "11 months",
        weeks: 48,
        months: 11,
        tuitionCost: 19010,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "lab-assistant-ekg-phlebotomist-hci",
        campusId: "hci",
        name: "Laboratory Assistant/EKG Technician/Phlebotomist",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 15600,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "medical-assistant-hci",
        campusId: "hci",
        name: "Medical Assistant",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 14085,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "commercial-refrigeration-hvac-hci",
        campusId: "hci",
        name: "Commercial Refrigeration, Heating and Air Conditioning",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 16585,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "electrical-technician-hci",
        campusId: "hci",
        name: "Electrical Technician",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 17290,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "surgical-technology-hci",
        campusId: "hci",
        name: "Surgical Technology",
        duration: "24 months",
        weeks: 104,
        months: 24,
        tuitionCost: 34424,
        active: true,
        effectiveDate: "2025-01-01"
      },
      // NCE Programs
      {
        id: "commercial-refrigeration-hvac-nce",
        campusId: "nce",
        name: "Commercial Refrigeration, Heating and Air Conditioning",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 16585,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "electrician-720-nce",
        campusId: "nce",
        name: "Electrician (720 Clock Hours)",
        duration: "9 months",
        weeks: 39,
        months: 9,
        hours: 720,
        tuitionCost: 16584,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "lab-assistant-ekg-phlebotomist-nce",
        campusId: "nce",
        name: "Lab Assistant, EKG Technician/Phlebotomist",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 14850,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "medical-assistant-nce",
        campusId: "nce",
        name: "Medical Assistant",
        duration: "9 months",
        weeks: 39,
        months: 9,
        tuitionCost: 14065,
        active: true,
        effectiveDate: "2025-01-01"
      },
      // ATI Programs
      {
        id: "automotive-technology-ati",
        campusId: "ati",
        name: "Automotive Technology",
        duration: "14 months",
        weeks: 61,
        months: 14,
        tuitionCost: 24530,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "hvac-cr-ati",
        campusId: "ati",
        name: "HVAC/CR",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 17535,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "electrician-720-ati",
        campusId: "ati",
        name: "Electrician (720 Clock Hours)",
        duration: "9 months",
        weeks: 39,
        months: 9,
        hours: 720,
        tuitionCost: 18457,
        active: true,
        effectiveDate: "2025-01-01"
      },
      {
        id: "personal-fitness-trainer-ati",
        campusId: "ati",
        name: "Personal Fitness Trainer",
        duration: "10 months",
        weeks: 43,
        months: 10,
        tuitionCost: 15170,
        active: true,
        effectiveDate: "2025-01-01"
      }
    ]
  };

  // Helper functions to work with the database
  const getActiveCampuses = () => {
    return programDatabase.campuses.filter(campus => campus.active);
  };

  const getProgramsByCampus = (campusName) => {
    const campus = programDatabase.campuses.find(c => c.name === campusName);
    if (!campus) return [];
    
    return programDatabase.programs.filter(program => 
      program.campusId === campus.id && program.active
    );
  };

  const getProgramCost = (programName) => {
    const program = programDatabase.programs.find(p => p.name === programName);
    return program ? program.tuitionCost : 0;
  };

  const getProgramDetails = (programName) => {
    return programDatabase.programs.find(p => p.name === programName) || null;
  };

  // Calculate total financial aid
  const totalFinancialAid = financialAid.pellGrant + financialAid.federalLoans + financialAid.additionalFunding;

  // Calculate remaining balance
  const calculatedBalance = Math.max(0, tuition + costs.laptopOptOut + costs.bookOptOut - totalFinancialAid);

  // Auto-populate balance field when calculated balance changes
  useEffect(() => {
    if (calculatedBalance > 0) {
      setBalance(calculatedBalance);
    }
  }, [calculatedBalance]);

  // Helper function to get active balance for calculations
  const getActiveBalance = () => {
    return balance > 0 ? balance : calculatedBalance;
  };

  // Helper function to get down payment percentage
  const getDownPaymentPercentage = () => {
    const activeBalance = getActiveBalance();
    if (activeBalance === 0) return 0;
    return Math.min((downPayment / activeBalance) * 100, 100);
  };

  // Helper function to get remaining finance amount
  const getFinanceAmount = () => {
    return Math.max(0, getActiveBalance() - downPayment);
  };

  // NEW SIMPLE INTEREST RATE FUNCTION
  const calculateInterestRate = (programLengthMonths, paymentTermMonths, downPaymentPercent) => {
    // If payment term equals program length, always 0%
    if (paymentTermMonths === programLengthMonths) {
      return 0;
    }
    
    // Calculate how many months beyond program
    const monthsBeyond = paymentTermMonths - programLengthMonths;
    
    // Determine base rate
    let baseRate;
    if (monthsBeyond <= 12) {
      baseRate = 6.9;
    } else if (monthsBeyond <= 24) {
      baseRate = 7.9;
    } else if (monthsBeyond <= 36) {
      baseRate = 8.9;
    } else {
      baseRate = 8.9;
    }
    
    // Apply discount (half of down payment percentage)
    const discount = (downPaymentPercent / 2) / 100;
    const finalRate = baseRate * (1 - discount);
    
    return Math.round(finalRate * 10) / 10;
  };

  // Helper function to get the rate tier description
  const getRateTierDescription = () => {
    const percentage = getDownPaymentPercentage();
    const program = getProgramDetails(campusInfo.program);
    
    if (program && program.months) {
      return `${program.months}-Month Program (0% APR available)`;
    }
    
    return `${percentage.toFixed(1)}% Down Payment`;
  };

  const handleCampusInfoChange = (field, value) => {
    setCampusInfo(prev => {
      const newInfo = {
        ...prev,
        [field]: value,
        ...(field === 'campus' && { program: '' })
      };
      
      if (field === 'program' && value) {
        const programCost = getProgramCost(value);
        if (programCost > 0) {
          setTuition(programCost);
        }
      }
      
      return newInfo;
    });
  };

  const handleStudentInfoChange = (field, value) => {
    setStudentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTuitionChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setTuition(value);
  };

  const handleFinancialAidChange = (field, value) => {
    setFinancialAid(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleBalanceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setBalance(value);
  };

  const handleDownPaymentChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setDownPayment(value);
  };

  const handleEmail = () => {
    // Generate email content
    const activeBalance = getActiveBalance();
    const financeAmount = getFinanceAmount();
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Create email subject - keep it simple
    const subject = `Payment Plan - ${studentInfo.name || 'Student'}`;
    
    // Create SHORTER email body to avoid 500 errors
    const body = `Dear ${studentInfo.name || 'Student'},

Thank you for your interest in ${campusInfo.program || 'our program'} at ${campusInfo.campus || 'our campus'}.

FINANCIAL SUMMARY
Tuition: ${formatCurrency(tuition)}
Financial Aid: ${formatCurrency(totalFinancialAid)}
Balance: ${formatCurrency(activeBalance)}
${downPayment > 0 ? `Down Payment: ${formatCurrency(downPayment)}
` : ''}To Finance: ${formatCurrency(financeAmount)}

${financeAmount > 0 && paymentPlans.length > 0 ? `PAYMENT OPTIONS:
${paymentPlans.map((plan, index) => `
${index + 1}. ${plan.description}: ${formatCurrency(plan.monthlyPayment)}/mo (${plan.interestRate}% APR)${plan.isZeroInterest ? ' - 0% INTEREST!' : ''}`).join('')}

Full details in attached document.` : financeAmount === 0 && activeBalance > 0 ? 'Fully paid with down payment!' : 'See attached for details.'}

Questions? Contact:
${studentInfo.admissionsRep || 'Admissions'}
${studentInfo.financialAidOfficer || 'Financial Aid'}

Best regards,
${campusInfo.campus || 'Mikhail Education'}`;

    // Create modal with multiple options
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 10px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    `;
    
    // Create simple mailto URL with minimal content
    const simpleMailto = `mailto:${studentInfo.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    content.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 40px; margin-bottom: 15px;">📧</div>
        <h3 style="color: #2563eb; margin-bottom: 20px;">Email Payment Plan</h3>
      </div>
      
      ${studentInfo.email ? `
      <div style="background: #dcfce7; padding: 12px; border-radius: 6px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">✅</span>
        <div>
          <div style="font-weight: bold; color: #059669;">Email will be sent to:</div>
          <div style="color: #047857; font-family: monospace;">${studentInfo.email}</div>
        </div>
      </div>
      ` : `
      <div style="background: #fef3c7; padding: 12px; border-radius: 6px; margin-bottom: 15px;">
        <p style="color: #92400e; margin: 0;">
          <strong>⚠️ No email address entered.</strong> Please add the student's email address after opening your email client.
        </p>
      </div>
      `}
      
      <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="font-weight: bold; margin-bottom: 10px; color: #3730a3;">Choose your email method:</p>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
        
        <!-- Option 1: Simple mailto -->
        <div style="border: 2px solid #10b981; border-radius: 8px; padding: 15px; background: #f0fdf4;">
          <h4 style="color: #059669; margin: 0 0 10px 0;">Option 1: Desktop Email Client (Recommended)</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Opens your default desktop email program (Outlook, Mail, etc.)</p>
          <a href="${simpleMailto}" style="
            display: inline-block;
            background: #059669;
            color: white;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 14px;
            font-weight: bold;
          ">📧 Open Desktop Email</a>
        </div>
        
        <!-- Option 2: Copy and paste -->
        <div style="border: 2px solid #3b82f6; border-radius: 8px; padding: 15px; background: #eff6ff;">
          <h4 style="color: #2563eb; margin: 0 0 10px 0;">Option 2: Copy & Paste</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Manually copy the content below into any email client</p>
          <button onclick="
            const emailData = {
              to: '${studentInfo.email || ''}',
              subject: '${subject.replace(/'/g, "\\'")}',
              body: \`${body.replace(/`/g, '\\`').replace(/'/g, "\\'")}\`
            };
            const textarea = document.createElement('textarea');
            textarea.value = 'To: ' + emailData.to + '\\n\\nSubject: ' + emailData.subject + '\\n\\n' + emailData.body;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.textContent = '✅ Copied!';
            setTimeout(() => { this.textContent = '📋 Copy Email Content'; }, 2000);
          " style="
            background: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
          ">📋 Copy Email Content</button>
        </div>
      </div>
      
      <div style="text-align: center;">
        <button onclick="this.closest('[style*=\\"position: fixed\\"]').remove()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 10px 30px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
        ">Close</button>
      </div>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };
  };

  const handleSavePDF = () => {
    // Generate HTML content for download
    const activeBalance = getActiveBalance();
    const financeAmount = getFinanceAmount();
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const program = getProgramDetails(campusInfo.program);
    
    const htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <title>Payment Plan - ${studentInfo.name || 'Student'}</title>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.4; 
              color: #333; 
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 30px;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #2563eb;
              font-size: 28px;
              margin-bottom: 8px;
              font-weight: bold;
            }
            .section {
              margin-bottom: 30px;
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #2563eb;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 15px;
            }
            .cost-summary {
              background: white;
              padding: 15px;
              border-radius: 6px;
              border: 1px solid #e5e7eb;
            }
            .cost-item {
              display: flex;
              justify-content: space-between;
              padding: 6px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .cost-item:last-child {
              border-bottom: none;
            }
            .cost-item.total {
              border-top: 2px solid #2563eb;
              padding-top: 10px;
              margin-top: 10px;
              font-weight: bold;
              font-size: 16px;
            }
            .payment-plans {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 15px;
              margin-top: 15px;
            }
            .payment-plan {
              background: white;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
            }
            .payment-plan.zero-interest {
              border-color: #10b981;
              background: #f0fdf4;
            }
            .plan-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .plan-title {
              font-weight: bold;
              color: #2563eb;
              font-size: 14px;
            }
            .plan-rate {
              background: #dbeafe;
              color: #1e40af;
              font-size: 11px;
              padding: 3px 8px;
              border-radius: 4px;
            }
            .plan-rate.zero {
              background: #10b981;
              color: white;
            }
            .plan-payment {
              font-size: 22px;
              font-weight: bold;
              color: #059669;
              margin: 10px 0;
            }
            .plan-details {
              font-size: 12px;
              color: #666;
              margin: 3px 0;
            }
            .signatures {
              margin-top: 60px;
              page-break-inside: avoid;
            }
            .signature-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 60px;
              margin-top: 40px;
            }
            .signature-box {
              text-align: center;
            }
            .signature-line {
              border-bottom: 2px solid #333;
              height: 40px;
              margin-bottom: 10px;
            }
            .signature-label {
              font-size: 14px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .signature-name {
              font-size: 11px;
              color: #666;
              margin-bottom: 20px;
            }
            .date-line {
              border-bottom: 1px solid #333;
              height: 25px;
              width: 150px;
              margin: 0 auto 5px auto;
            }
            .date-label {
              font-size: 10px;
              color: #666;
            }
            .green { color: #059669; }
            .blue { color: #2563eb; }
            .orange { color: #ea580c; }
            .purple { color: #7c3aed; }
            @media print {
              body { padding: 20px; }
              .section { break-inside: avoid; }
              .signatures { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Mikhail Education Payment Plan Calculator</h1>
            <div>Multi-Campus Payment Planning System</div>
            <div>Generated on ${currentDate}</div>
          </div>
          
          <div class="section">
            <div class="section-title">📚 Campus & Program Information</div>
            <div class="cost-summary">
              <div class="cost-item">
                <span><strong>Campus:</strong></span>
                <span>${campusInfo.campus || 'Not specified'}</span>
              </div>
              <div class="cost-item">
                <span><strong>Program:</strong></span>
                <span>${campusInfo.program || 'Not specified'}</span>
              </div>
              ${program ? `
              <div class="cost-item">
                <span><strong>Duration:</strong></span>
                <span>${program.duration} (${program.weeks} weeks)</span>
              </div>
              ` : ''}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">👤 Student Information</div>
            <div class="cost-summary">
              <div class="cost-item">
                <span><strong>Student Name:</strong></span>
                <span>${studentInfo.name || 'Not specified'}</span>
              </div>
              <div class="cost-item">
                <span><strong>Email:</strong></span>
                <span>${studentInfo.email || 'Not specified'}</span>
              </div>
              <div class="cost-item">
                <span><strong>Admissions Rep:</strong></span>
                <span>${studentInfo.admissionsRep || 'Not specified'}</span>
              </div>
              <div class="cost-item">
                <span><strong>Financial Aid Officer:</strong></span>
                <span>${studentInfo.financialAidOfficer || 'Not specified'}</span>
              </div>
              <div class="cost-item">
                <span><strong>EFC:</strong></span>
                <span>${studentInfo.efc}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">💰 Financial Summary</div>
            <div class="cost-summary">
              <div class="cost-item">
                <span>Program Tuition:</span>
                <span class="orange"><strong>${formatCurrency(tuition)}</strong></span>
              </div>
              <div class="cost-item">
                <span>Pell Grant:</span>
                <span class="green">${formatCurrency(financialAid.pellGrant)}</span>
              </div>
              <div class="cost-item">
                <span>Federal Student Loans:</span>
                <span class="green">${formatCurrency(financialAid.federalLoans)}</span>
              </div>
              <div class="cost-item">
                <span>Additional Funding:</span>
                <span class="green">${formatCurrency(financialAid.additionalFunding)}</span>
              </div>
              <div class="cost-item">
                <span><strong>Total Financial Aid:</strong></span>
                <span class="green"><strong>${formatCurrency(totalFinancialAid)}</strong></span>
              </div>
              <div class="cost-item">
                <span><strong>Student Balance:</strong></span>
                <span class="blue"><strong>${formatCurrency(activeBalance)}</strong></span>
              </div>
              ${downPayment > 0 ? `
              <div class="cost-item">
                <span>Down Payment (${getDownPaymentPercentage().toFixed(1)}%):</span>
                <span class="purple"><strong>${formatCurrency(downPayment)}</strong></span>
              </div>
              ` : ''}
              <div class="cost-item total">
                <span>Amount to Finance:</span>
                <span class="blue">${formatCurrency(financeAmount)}</span>
              </div>
            </div>
          </div>
          
          ${financeAmount > 0 ? `
          <div class="section">
            <div class="section-title">📅 Payment Plan Options - ${getRateTierDescription()}</div>
            <div class="payment-plans">
              ${paymentPlans.map(plan => `
                <div class="payment-plan ${plan.isZeroInterest ? 'zero-interest' : ''}">
                  <div class="plan-header">
                    <span class="plan-title">${plan.description}</span>
                    <span class="plan-rate ${plan.isZeroInterest ? 'zero' : ''}">${plan.interestRate}% APR</span>
                  </div>
                  ${plan.isZeroInterest ? '<div style="color: #10b981; font-weight: bold; font-size: 12px;">✨ 0% INTEREST!</div>' : ''}
                  <div class="plan-payment">${formatCurrency(plan.monthlyPayment)}</div>
                  <div class="plan-details"><strong>Monthly Payment</strong></div>
                  <div class="plan-details">${plan.months} payments total</div>
                  <div class="plan-details">Principal: ${formatCurrency(plan.totalAmount - plan.totalInterest)}</div>
                  ${plan.totalInterest > 0 ? `<div class="plan-details" style="color: #ea580c;">Interest: ${formatCurrency(plan.totalInterest)}</div>` : ''}
                  <div class="plan-details" style="font-weight: bold; border-top: 1px solid #e5e7eb; padding-top: 5px; margin-top: 5px;">
                    Total: ${formatCurrency(plan.totalAmount)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : `
          <div class="section">
            <div class="section-title">✅ Payment Status</div>
            <div style="text-align: center; padding: 25px; background: #dcfce7; border-radius: 8px;">
              <h3 style="color: #059669; margin-bottom: 10px; font-size: 20px;">🎉 Congratulations!</h3>
              <p style="color: #047857; font-size: 14px;">Your down payment covers the entire balance.</p>
              <p style="color: #047857; font-size: 14px;">No monthly payments required.</p>
            </div>
          </div>
          `}
          
          <div class="signatures">
            <div style="text-align: center; margin-bottom: 30px;">
              <h3 style="font-size: 18px; color: #2563eb; margin-bottom: 10px;">📝 Agreement Signatures</h3>
              <p style="font-size: 12px; color: #666; line-height: 1.5;">
                By signing below, both parties acknowledge and agree to the payment plan terms outlined above.
              </p>
            </div>
            
            <div class="signature-grid">
              <div class="signature-box">
                <div class="signature-label">Student Signature</div>
                <div class="signature-line"></div>
                <div class="signature-name">${studentInfo.name || 'Student Name'}</div>
                <div class="date-line"></div>
                <div class="date-label">Date</div>
              </div>
              
              <div class="signature-box">
                <div class="signature-label">Admissions Representative</div>
                <div class="signature-line"></div>
                <div class="signature-name">${studentInfo.admissionsRep || 'Representative Name'}</div>
                <div class="date-line"></div>
                <div class="date-label">Date</div>
              </div>
            </div>
            
            <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 11px; color: #666; text-align: center; line-height: 1.6;">
                This payment plan agreement is subject to the terms and conditions of the enrollment agreement.<br>
                For questions or concerns, please contact the Financial Aid Office at ${campusInfo.campus || 'your campus'}.
              </p>
            </div>
          </div>
        </body>
      </html>`;
    
    // Create a Blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create a download link
    const link = document.createElement('a');
    const fileName = `Payment_Plan_${studentInfo.name || 'Student'}_${new Date().toISOString().split('T')[0]}.html`;
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL
    URL.revokeObjectURL(link.href);
    
    // Show success message
    const successModal = document.createElement('div');
    successModal.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #059669;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;
    successModal.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px;">✅</span>
        <div>
          <div style="font-weight: bold;">File Downloaded!</div>
          <div style="font-size: 12px; opacity: 0.9;">${fileName}</div>
        </div>
      </div>
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(successModal);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
      if (document.body.contains(successModal)) {
        document.body.removeChild(successModal);
      }
    }, 5000);
  };

  // NEW PAYMENT PLAN CALCULATION
  useEffect(() => {
    const program = getProgramDetails(campusInfo.program);
    if (!program) {
      setPaymentPlans([]);
      return;
    }
    
    const financeAmount = getFinanceAmount();
    if (financeAmount <= 0) {
      setPaymentPlans([]);
      return;
    }
    
    const programMonths = program.months;
    const downPaymentPercent = getDownPaymentPercentage();
    
    // Create exactly 5 payment terms
    const terms = [
      programMonths,           // Program length
      programMonths + 12,      // +12 months
      programMonths + 24,      // +24 months
      programMonths + 36,      // +36 months
      programMonths + 48       // +48 months
    ];
    
    const plans = terms.map((termMonths, index) => {
      const rate = calculateInterestRate(programMonths, termMonths, downPaymentPercent);
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
      
      let description = `${termMonths} Month Plan`;
      if (index === 0) {
        description += ' (Program Length)';
      } else {
        description += ` (+${termMonths - programMonths} months)`;
      }
      
      return {
        months: termMonths,
        description: description,
        interestRate: rate,
        monthlyPayment: monthlyPayment,
        totalAmount: totalAmount,
        totalInterest: totalInterest,
        isZeroInterest: rate === 0
      };
    });
    
    setPaymentPlans(plans);
  }, [campusInfo.program, balance, tuition, totalFinancialAid, costs, downPayment]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header with Print/Save buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mikhail Education Payment Plan Calculator</h1>
              <p className="text-gray-600">Multi-Campus Payment Planning System</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleEmail}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Email
            </button>
            <button
              onClick={handleSavePDF}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Save HTML
            </button>
          </div>
        </div>
      </div>

      {/* Campus and Program Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <Calculator className="h-5 w-5 text-indigo-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Campus & Program Selection</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Campus:
            </label>
            <select
              value={campusInfo.campus}
              onChange={(e) => handleCampusInfoChange('campus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">-- Select a Campus --</option>
              {getActiveCampuses().map((campus) => (
                <option key={campus.id} value={campus.name}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Program:
            </label>
            <select
              value={campusInfo.program}
              onChange={(e) => handleCampusInfoChange('program', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={!campusInfo.campus}
            >
              <option value="">-- Select a Program --</option>
              {getProgramsByCampus(campusInfo.campus).map((program) => (
                <option key={program.id} value={program.name}>
                  {program.name} ({program.duration})
                </option>
              ))}
            </select>
            {!campusInfo.campus && (
              <p className="text-xs text-gray-500 mt-1">Please select a campus first</p>
            )}
          </div>
        </div>
        
        {campusInfo.campus && campusInfo.program && getProgramDetails(campusInfo.program) && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
            <div className="text-sm text-indigo-800">
              <strong>Selected:</strong> {campusInfo.program} at {campusInfo.campus}
              <br />
              <strong>Duration:</strong> {getProgramDetails(campusInfo.program).duration} ({getProgramDetails(campusInfo.program).weeks} weeks)
              <br />
              <span className="text-green-600 font-semibold">
                ✨ 0% interest available for {getProgramDetails(campusInfo.program).months}-month payment plan!
              </span>
            </div>
          </div>
        )}
      </div>

      <div id="payment-calculator">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Student Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Student Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name:
                </label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) => handleStudentInfoChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter student name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Email:
                </label>
                <input
                  type="email"
                  value={studentInfo.email}
                  onChange={(e) => handleStudentInfoChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="student@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admissions Rep:
                </label>
                <input
                  type="text"
                  value={studentInfo.admissionsRep}
                  onChange={(e) => handleStudentInfoChange('admissionsRep', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admissions representative name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Aid Officer:
                </label>
                <input
                  type="text"
                  value={studentInfo.financialAidOfficer}
                  onChange={(e) => handleStudentInfoChange('financialAidOfficer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter financial aid officer name"
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600">EFC:</span>
                <span className="font-medium bg-gray-100 px-3 py-1 rounded">{studentInfo.efc}</span>
              </div>
            </div>
          </div>

          {/* Financial Aid Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Financial Aid</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pell Grant:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={financialAid.pellGrant}
                    onChange={(e) => handleFinancialAidChange('pellGrant', e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Federal Student Loans (Net):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={financialAid.federalLoans}
                    onChange={(e) => handleFinancialAidChange('federalLoans', e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Funding Source (VA/PLUS loan):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={financialAid.additionalFunding}
                    onChange={(e) => handleFinancialAidChange('additionalFunding', e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Financial Aid:</span>
                  <span className="text-green-600">{formatCurrency(totalFinancialAid)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Costs and Balance */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-orange-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Program Costs</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuition:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={tuition}
                    onChange={handleTuitionChange}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
                {campusInfo.program && getProgramCost(campusInfo.program) && (
                  <p className="text-xs text-green-600 mt-1">
                    ✔ Auto-filled based on selected program
                  </p>
                )}
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Laptop (Opt Out):</span>
                <span className="font-medium">{formatCurrency(costs.laptopOptOut)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Books (Opt Out):</span>
                <span className="font-medium">{formatCurrency(costs.bookOptOut)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Cost Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Program Cost:</span>
                    <span className="font-medium">{formatCurrency(tuition + costs.laptopOptOut + costs.bookOptOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Financial Aid:</span>
                    <span className="font-medium text-green-600">-{formatCurrency(totalFinancialAid)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Remaining Balance:</span>
                      <span className="text-blue-600">{formatCurrency(calculatedBalance)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Balance Input */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance to Finance (Override)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={balance}
                    onChange={handleBalanceChange}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-semibold"
                    placeholder={formatCurrency(calculatedBalance).replace('$', '')}
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Down Payment Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center mb-4">
            <DollarSign className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Down Payment</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment Amount:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={handleDownPaymentChange}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg font-semibold"
                    placeholder="0.00"
                    step="0.01"
                    max={getActiveBalance()}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Balance:</span>
                    <span className="font-medium">{formatCurrency(getActiveBalance())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment:</span>
                    <span className="font-medium text-purple-600">-{formatCurrency(downPayment)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Amount to Finance:</span>
                      <span className="text-blue-600">{formatCurrency(getFinanceAmount())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Down Payment Breakdown</h3>
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="text-sm font-medium text-blue-800 mb-1">
                    Current Rate Tier: {getRateTierDescription()}
                  </div>
                  <div className="text-xs text-blue-600">
                    {getDownPaymentPercentage().toFixed(1)}% down payment
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-8 rounded-full transition-all duration-300 ease-out flex items-center justify-end pr-2"
                      style={{ width: `${Math.min(getDownPaymentPercentage(), 100)}%` }}
                    >
                      {getDownPaymentPercentage() > 15 && (
                        <span className="text-white text-xs font-semibold">
                          {getDownPaymentPercentage().toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Plans */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Payment Plan Options</h2>
          </div>
          
          {(getFinanceAmount() > 0 && paymentPlans.length > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {paymentPlans.map((plan, index) => (
                <div key={index} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${plan.isZeroInterest ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}>
                  {plan.isZeroInterest && (
                    <div className="text-xs font-bold text-white bg-green-500 rounded px-2 py-1 mb-2 text-center">
                      ✨ 0% INTEREST
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm text-gray-800">{plan.description}</h3>
                  </div>
                  <div className="space-y-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded text-center ${
                      plan.interestRate === 0 
                        ? 'bg-green-100 text-green-800' 
                        : plan.interestRate <= 2.9
                        ? 'bg-blue-100 text-blue-800'
                        : plan.interestRate <= 5.9
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {plan.interestRate}% APR
                    </div>
                    <div className="text-xl font-bold text-blue-600 text-center">
                      {formatCurrency(plan.monthlyPayment)}
                    </div>
                    <div className="text-xs text-gray-500 text-center">
                      per month
                    </div>
                    <div className="text-xs text-gray-500 border-t pt-2">
                      <div>Principal: {formatCurrency(plan.totalAmount - plan.totalInterest)}</div>
                      {plan.totalInterest > 0 && (
                        <div className="text-orange-500">Interest: {formatCurrency(plan.totalInterest)}</div>
                      )}
                      <div className="font-medium text-gray-700 mt-1">
                        Total: {formatCurrency(plan.totalAmount)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {getActiveBalance() > 0 ? (
                <div>
                  <p className="text-lg font-semibold text-green-600 mb-2">🎉 Congratulations!</p>
                  <p>Your down payment covers the entire balance!</p>
                  <p className="text-sm">No monthly payments required.</p>
                </div>
              ) : (
                <p>Select a program to see payment plan options</p>
              )}
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md p-6 mt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Payment Plan Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100">
              <div>
                <div className="text-sm">Total Balance</div>
                <div className="font-bold text-lg">{formatCurrency(getActiveBalance())}</div>
              </div>
              {downPayment > 0 && (
                <div>
                  <div className="text-sm">Down Payment</div>
                  <div className="font-bold text-lg">{formatCurrency(downPayment)}</div>
                </div>
              )}
              <div>
                <div className="text-sm">Amount to Finance</div>
                <div className="font-bold text-xl">{formatCurrency(getFinanceAmount())}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlanCalculator;
