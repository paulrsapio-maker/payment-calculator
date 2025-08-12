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

  // JSON Database - Easy to update by editing this object
  const programDatabase = {
    "lastUpdated": "2025-01-01",
    "academicYear": "2025-2026",
    "campuses": [
      {
        "id": "ati",
        "name": "Advanced Training Institute",
        "active": true
      },
      {
        "id": "lvc",
        "name": "Las Vegas College",
        "active": true
      },
      {
        "id": "lamson",
        "name": "Lamson Institute", 
        "active": true
      },
      {
        "id": "hci",
        "name": "Houston Career Institute",
        "active": true
      },
      {
        "id": "nce",
        "name": "National Career Education",
        "active": true
      },
      {
        "id": "ibt",
        "name": "Institute for Business and Technology",
        "active": true
      }
    ],
    "programs": [
      {
        "id": "auto-tech-ati",
        "campusId": "ati",
        "name": "Automotive Technology",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 24530,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "hvac-cr-ati",
        "campusId": "ati", 
        "name": "HVAC/CR",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 17535,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrician-720-ati",
        "campusId": "ati",
        "name": "Electrician (720 Clock Hours)",
        "duration": "Modular",
        "credits": null,
        "hours": 720,
        "tuitionCost": 18457,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrician-840-ati",
        "campusId": "ati",
        "name": "Electrician (840 Clock Hours; pending final USDOE approval)",
        "duration": "Modular",
        "credits": null,
        "hours": 840,
        "tuitionCost": 20152,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "personal-fitness-trainer-ati",
        "campusId": "ati",
        "name": "Personal Fitness Trainer",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 15170,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "accounting-lvc",
        "campusId": "lvc",
        "name": "Accounting",
        "duration": "24 months",
        "credits": 96,
        "hours": null,
        "tuitionCost": 29800,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "cardiovascular-sonography",
        "campusId": "lvc",
        "name": "Cardiovascular Sonography",
        "duration": "24 months",
        "credits": 129,
        "hours": null,
        "tuitionCost": 57889,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "medical-assistant",
        "campusId": "lvc",
        "name": "Medical Assistant",
        "duration": "36 weeks",
        "credits": null,
        "hours": 800,
        "tuitionCost": 14085,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "rn-to-bsn",
        "campusId": "lvc",
        "name": "RN to BSN",
        "duration": "15 months",
        "credits": 90,
        "hours": null,
        "tuitionCost": 13450,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "practical-nurse",
        "campusId": "lvc",
        "name": "Practical Nurse",
        "duration": "15 months",
        "credits": 55.5,
        "hours": null,
        "tuitionCost": 27775,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "nursing",
        "campusId": "lvc",
        "name": "Nursing",
        "duration": "24 months",
        "credits": 108,
        "hours": null,
        "tuitionCost": 60600,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "lab-assistant-ekg-phlebotomist",
        "campusId": "lvc",
        "name": "Laboratory Assistant/EKG Technician/Phlebotomist",
        "duration": "36 weeks",
        "credits": null,
        "hours": 800,
        "tuitionCost": 15600,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "lab-assistant-ekg-phlebotomist-ibt",
        "campusId": "ibt",
        "name": "Lab Assistant, EKG Technician/Phlebotomist",
        "duration": "Modular/Clock Hour",
        "credits": null,
        "hours": null,
        "tuitionCost": 16280,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "medical-assistant-ibt",
        "campusId": "ibt",
        "name": "Medical Assistant",
        "duration": "Modular/Clock Hour",
        "credits": null,
        "hours": null,
        "tuitionCost": 15290,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "automotive-technology-ibt",
        "campusId": "ibt",
        "name": "Automotive Technology",
        "duration": "Modular/Clock Hour",
        "credits": null,
        "hours": null,
        "tuitionCost": 28090,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "commercial-refrigeration-hvac-ibt",
        "campusId": "ibt",
        "name": "Commercial Refrigeration, Heating and Air Conditioning",
        "duration": "Modular/Clock Hour",
        "credits": null,
        "hours": null,
        "tuitionCost": 18700,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrician-720-ibt",
        "campusId": "ibt",
        "name": "Electrician (720 Clock Hours)",
        "duration": "Modular/Clock Hour",
        "credits": null,
        "hours": 720,
        "tuitionCost": 19195,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "cardiovascular-sonography-ibt",
        "campusId": "ibt",
        "name": "Cardiovascular Sonography",
        "duration": "Term-Based",
        "credits": 129,
        "hours": null,
        "creditType": "quarter credits",
        "tuitionCost": 61198,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "dental-assisting-lamson",
        "campusId": "lamson",
        "name": "Dental Assisting",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 18500,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "lab-assistant-ekg-phlebotomist-lamson",
        "campusId": "lamson",
        "name": "Lab Assistant, EKG Technician/Phlebotomist",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 16540,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "medical-assistant-lamson",
        "campusId": "lamson",
        "name": "Medical Assistant",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 15790,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrical-technician-lamson",
        "campusId": "lamson",
        "name": "Electrical Technician",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 17200,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "commercial-refrigeration-hvac-lamson",
        "campusId": "lamson",
        "name": "Commercial Refrigeration, Heating and Air Conditioning",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 18060,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "personal-fitness-trainer-lamson",
        "campusId": "lamson",
        "name": "Personal Fitness Trainer",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 15300,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "vocational-nursing-lamson",
        "campusId": "lamson",
        "name": "Vocational Nursing",
        "duration": "Term-Based",
        "credits": 72.5,
        "hours": null,
        "creditType": "quarter credits",
        "tuitionCost": 28095,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "dental-assisting-hci",
        "campusId": "hci",
        "name": "Dental Assisting",
        "duration": "47 weeks",
        "credits": null,
        "hours": 940,
        "tuitionCost": 19010,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "lab-assistant-ekg-phlebotomist-hci",
        "campusId": "hci",
        "name": "Laboratory Assistant/EKG Technician/Phlebotomist",
        "duration": "36 weeks",
        "credits": null,
        "hours": 800,
        "tuitionCost": 15600,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "medical-assistant-hci",
        "campusId": "hci",
        "name": "Medical Assistant",
        "duration": "36 weeks",
        "credits": null,
        "hours": 800,
        "tuitionCost": 14085,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "commercial-refrigeration-hvac-hci",
        "campusId": "hci",
        "name": "Commercial Refrigeration, Heating and Air Conditioning",
        "duration": "42 weeks",
        "credits": null,
        "hours": 840,
        "tuitionCost": 16585,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrical-technician-hci",
        "campusId": "hci",
        "name": "Electrical Technician",
        "duration": "42 weeks",
        "credits": null,
        "hours": 840,
        "tuitionCost": 17290,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "surgical-technology-hci",
        "campusId": "hci",
        "name": "Surgical Technology",
        "duration": "24 months",
        "credits": 98,
        "hours": null,
        "creditType": "quarter credits",
        "tuitionCost": 34424,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "commercial-refrigeration-hvac-nce",
        "campusId": "nce",
        "name": "Commercial Refrigeration, Heating and Air Conditioning",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 16585,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrician-720-nce",
        "campusId": "nce",
        "name": "Electrician (720 Clock Hours)",
        "duration": "Modular",
        "credits": null,
        "hours": 720,
        "tuitionCost": 16584,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "electrician-840-nce",
        "campusId": "nce",
        "name": "Electrician (840 Clock Hours)",
        "duration": "Modular",
        "credits": null,
        "hours": 840,
        "tuitionCost": 17290,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "lab-assistant-ekg-phlebotomist-nce",
        "campusId": "nce",
        "name": "Lab Assistant, EKG Technician/Phlebotomist",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 14850,
        "active": true,
        "effectiveDate": "2025-01-01"
      },
      {
        "id": "medical-assistant-nce",
        "campusId": "nce",
        "name": "Medical Assistant",
        "duration": "Modular",
        "credits": null,
        "hours": null,
        "tuitionCost": 14065,
        "active": true,
        "effectiveDate": "2025-01-01"
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

  // Helper function to get interest rate based on down payment percentage and term
  const getInterestRate = (downPaymentPercentage, months) => {
    const rates = {
      0: { 12: 0, 24: 4.9, 36: 7.9, 48: 8.9 },
      5: { 12: 0, 24: 3.9, 36: 6.9, 48: 7.9 },
      10: { 12: 0, 24: 2.9, 36: 5.9, 48: 6.9 },
      15: { 12: 0, 24: 1.9, 36: 4.9, 48: 5.9 },
      20: { 12: 0, 24: 0, 36: 3.9, 48: 4.9 },
      25: { 12: 0, 24: 0, 36: 2.9, 48: 3.9 },
      999: { 12: 0, 24: 0, 36: 1.9, 48: 2.9 }
    };

    let rateTier;
    if (downPaymentPercentage >= 25) {
      rateTier = downPaymentPercentage > 25 ? 999 : 25;
    } else if (downPaymentPercentage >= 20) {
      rateTier = 20;
    } else if (downPaymentPercentage >= 15) {
      rateTier = 15;
    } else if (downPaymentPercentage >= 10) {
      rateTier = 10;
    } else if (downPaymentPercentage >= 5) {
      rateTier = 5;
    } else {
      rateTier = 0;
    }

    return rates[rateTier][months];
  };

  // Helper function to get the rate tier description
  const getRateTierDescription = () => {
    const percentage = getDownPaymentPercentage();
    if (percentage >= 25) {
      return percentage > 25 ? '>25% Down Payment Tier' : '25% Down Payment Tier';
    } else if (percentage >= 20) {
      return '20% Down Payment Tier';
    } else if (percentage >= 15) {
      return '15% Down Payment Tier';
    } else if (percentage >= 10) {
      return '10% Down Payment Tier';
    } else if (percentage >= 5) {
      return '5% Down Payment Tier';
    } else {
      return '0% Down Payment Tier';
    }
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
${index + 1}. ${plan.description}: ${formatCurrency(plan.monthlyPayment)}/mo (${plan.interestRate}% APR)`).join('')}

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
        
        <!-- Option 3: Web mail -->
        <div style="border: 2px solid #8b5cf6; border-radius: 8px; padding: 15px; background: #f3f0ff;">
          <h4 style="color: #7c3aed; margin: 0 0 10px 0;">Option 3: Open Web Mail Manually</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 10px;">Open Outlook.com or Office 365 in a new tab and paste the content</p>
          <div style="display: flex; gap: 10px;">
            <a href="https://outlook.office.com/mail/deeplink/compose" target="_blank" style="
              background: #7c3aed;
              color: white;
              padding: 10px 15px;
              border-radius: 6px;
              text-decoration: none;
              font-size: 13px;
              font-weight: bold;
            ">🌐 Outlook Web</a>
            <a href="https://outlook.live.com/mail/0/deeplink/compose" target="_blank" style="
              background: #7c3aed;
              color: white;
              padding: 10px 15px;
              border-radius: 6px;
              text-decoration: none;
              font-size: 13px;
              font-weight: bold;
            ">🌐 Outlook.com</a>
          </div>
        </div>
      </div>
      
      <details style="margin-bottom: 20px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px;">
        <summary style="cursor: pointer; color: #6b7280; font-size: 14px; font-weight: bold;">
          View Full Email Content
        </summary>
        
        <div style="margin-top: 15px;">
          <div style="background: #f9fafb; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
            <label style="font-weight: bold; color: #374151; display: block; margin-bottom: 5px; font-size: 11px;">To:</label>
            <input type="text" value="${studentInfo.email || ''}" style="
              width: 100%;
              padding: 6px;
              border: 1px solid #d1d5db;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
            " onclick="this.select()" readonly />
          </div>
          
          <div style="background: #f9fafb; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
            <label style="font-weight: bold; color: #374151; display: block; margin-bottom: 5px; font-size: 11px;">Subject:</label>
            <input type="text" value="${subject}" style="
              width: 100%;
              padding: 6px;
              border: 1px solid #d1d5db;
              border-radius: 4px;
              font-family: monospace;
              font-size: 12px;
            " onclick="this.select()" readonly />
          </div>
          
          <div style="background: #f9fafb; padding: 10px; border-radius: 6px;">
            <label style="font-weight: bold; color: #374151; display: block; margin-bottom: 5px; font-size: 11px;">Body:</label>
            <textarea style="
              width: 100%;
              padding: 6px;
              border: 1px solid #d1d5db;
              border-radius: 4px;
              font-family: monospace;
              font-size: 11px;
              height: 200px;
              resize: vertical;
            " onclick="this.select()" readonly>${body}</textarea>
          </div>
        </div>
      </details>
      
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
    
    const htmlContent = `<!DOCTYPE html>
      <html>
        <head>
          <title>ATI Payment Plan - ${studentInfo.name || 'Student'}</title>
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
              grid-template-columns: repeat(2, 1fr);
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
            <div class="section-title">📍 Campus & Program Information</div>
            <div class="cost-summary">
              <div class="cost-item">
                <span><strong>Campus:</strong></span>
                <span>${campusInfo.campus || 'Not specified'}</span>
              </div>
              <div class="cost-item">
                <span><strong>Program:</strong></span>
                <span>${campusInfo.program || 'Not specified'}</span>
              </div>
              ${campusInfo.program && getProgramDetails(campusInfo.program) ? `
              <div class="cost-item">
                <span><strong>Duration:</strong></span>
                <span>${getProgramDetails(campusInfo.program).duration}</span>
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
                <div class="payment-plan">
                  <div class="plan-header">
                    <span class="plan-title">${plan.description}</span>
                    <span class="plan-rate">${plan.interestRate}% APR</span>
                  </div>
                  <div class="plan-payment">${formatCurrency(plan.monthlyPayment)}</div>
                  <div class="plan-details"><strong>Monthly Payment</strong></div>
                  <div class="plan-details">${plan.months} payments total</div>
                  <div class="plan-details">Principal: ${formatCurrency(plan.totalAmount - plan.totalInterest)}</div>
                  ${plan.totalInterest > 0 ? `<div class="plan-details" style="color: #ea580c;">Interest: ${formatCurrency(plan.totalInterest)}</div>` : ''}
                  <div class="plan-details" style="font-weight: bold; border-top: 1px solid #e5e7eb; padding-top: 5px; margin-top: 5px;">
                    Total: ${formatCurrency(plan.totalAmount)}
                  </div>
                  ${downPayment > 0 ? `<div class="plan-details" style="color: #7c3aed; font-weight: bold;">+ ${formatCurrency(downPayment)} down payment</div>` : ''}
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
                <div class="signature-label">School Representative</div>
                <div class="signature-line"></div>
                <div class="signature-name">${studentInfo.admissionsRep || 'Representative Name'}</div>
                <div class="date-line"></div>
                <div class="date-label">Date</div>
              </div>
            </div>
          </div>
        </body>
      </html>`;
    
    // Create a Blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create a download link
    const link = document.createElement('a');
    const fileName = `ATI_Payment_Plan_${studentInfo.name || 'Student'}_${new Date().toISOString().split('T')[0]}.html`;
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

  // Calculate payment plans when balance changes
  useEffect(() => {
    const calculatePaymentPlans = () => {
      const plans = [];
      const calculatedBalance = Math.max(0, tuition + costs.laptopOptOut + costs.bookOptOut - totalFinancialAid);
      const activeBalance = balance > 0 ? balance : calculatedBalance;
      const financeAmount = Math.max(0, activeBalance - downPayment);
      
      const planOptions = [
        { months: 12, description: '12 Month Plan' },
        { months: 24, description: '24 Month Plan' },
        { months: 36, description: '36 Month Plan' },
        { months: 48, description: '48 Month Plan' }
      ];

      const downPaymentPercentage = getDownPaymentPercentage();

      planOptions.forEach(option => {
        if (financeAmount > 0) {
          const interestRate = getInterestRate(downPaymentPercentage, option.months);
          const monthlyInterestRate = interestRate / 100 / 12;
          
          let monthlyPayment, totalAmount;
          
          if (interestRate === 0) {
            monthlyPayment = financeAmount / option.months;
            totalAmount = financeAmount;
          } else {
            monthlyPayment = financeAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, option.months)) / (Math.pow(1 + monthlyInterestRate, option.months) - 1);
            totalAmount = monthlyPayment * option.months;
          }
          
          plans.push({
            ...option,
            interestRate: interestRate,
            monthlyPayment: monthlyPayment,
            totalAmount: totalAmount,
            totalInterest: totalAmount - financeAmount
          });
        }
      });

      setPaymentPlans(plans);
    };

    calculatePaymentPlans();
  }, [balance, tuition, totalFinancialAid, costs.laptopOptOut, costs.bookOptOut, downPayment]);

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
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
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
                  {program.name} ({program.duration}{program.hours ? `, ${program.hours} hours` : program.credits ? `, ${program.credits} ${program.creditType || 'credits'}` : ''})
                </option>
              ))}
            </select>
            {!campusInfo.campus && (
              <p className="text-xs text-gray-500 mt-1">Please select a campus first</p>
            )}
            {campusInfo.campus && getProgramsByCampus(campusInfo.campus).length === 0 && (
              <p className="text-xs text-gray-500 mt-1">No programs available for this campus yet</p>
            )}
            {campusInfo.campus && getProgramsByCampus(campusInfo.campus).length > 0 && (
              <p className="text-xs text-indigo-600 mt-1">
                📚 Database last updated: {programDatabase.lastUpdated} (Academic Year: {programDatabase.academicYear})
              </p>
            )}
          </div>
        </div>
        
        {campusInfo.campus && campusInfo.program && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
            <div className="text-sm text-indigo-800">
              <strong>Selected:</strong> {campusInfo.program} at {campusInfo.campus}
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
                    ✓ Auto-filled based on selected program: {campusInfo.program} ({getProgramDetails(campusInfo.program)?.duration}{getProgramDetails(campusInfo.program)?.hours ? `, ${getProgramDetails(campusInfo.program)?.hours} hours` : getProgramDetails(campusInfo.program)?.credits ? `, ${getProgramDetails(campusInfo.program)?.credits} ${getProgramDetails(campusInfo.program)?.creditType || 'credits'}` : ''})
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
                    {calculatedBalance > 0 && (
                      <p className="text-xs text-blue-600 mt-1">
                        ✓ This amount has been automatically copied to "Balance to Finance" below
                      </p>
                    )}
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
                <p className="text-xs text-gray-500 mt-1">
                  {balance === calculatedBalance ? 
                    "Auto-filled from remaining balance above. You can modify this amount if needed." :
                    "Modified balance amount. Original calculated balance was " + formatCurrency(calculatedBalance)
                  }
                </p>
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
                <p className="text-xs text-gray-500 mt-1">Enter down payment amount (optional)</p>
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
                    {getDownPaymentPercentage().toFixed(1)}% down payment qualifies for reduced interest rates
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
                  {getDownPaymentPercentage() <= 15 && getDownPaymentPercentage() > 0 && (
                    <span className="absolute left-2 top-1 text-gray-600 text-xs font-semibold">
                      {getDownPaymentPercentage().toFixed(1)}%
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="text-orange-600">5%</span>
                  <span className="text-orange-600">10%</span>
                  <span className="text-green-600">15%</span>
                  <span className="text-green-600">20%</span>
                  <span className="text-green-600">25%</span>
                  <span>100%</span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Higher Rates</span>
                  <span>Lower Rates</span>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Interest Rates</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>12 months:</span>
                    <span className="font-medium text-green-600">{getInterestRate(getDownPaymentPercentage(), 12)}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24 months:</span>
                    <span className="font-medium text-blue-600">{getInterestRate(getDownPaymentPercentage(), 24)}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>36 months:</span>
                    <span className="font-medium text-orange-600">{getInterestRate(getDownPaymentPercentage(), 36)}% APR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>48 months:</span>
                    <span className="font-medium text-red-600">{getInterestRate(getDownPaymentPercentage(), 48)}% APR</span>
                  </div>
                </div>
              </div>
              
              {downPayment > 0 && (
                <div className="text-center text-sm text-green-600 font-medium">
                  💰 Your {getDownPaymentPercentage().toFixed(1)}% down payment qualifies for preferred rates!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment Plans */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Payment Plan Options</h2>
          </div>
          
          {(getFinanceAmount() > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {paymentPlans.map((plan, index) => (
                <div key={index} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${plan.interestRate === 0 ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{plan.description}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      plan.interestRate === 0 
                        ? 'bg-green-100 text-green-800' 
                        : plan.interestRate <= 2.9
                        ? 'bg-blue-100 text-blue-800'
                        : plan.interestRate <= 5.9
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {plan.interestRate}% APR
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Monthly Payment:
                    </div>
                    <div className="text-xl font-bold text-blue-600">
                      {formatCurrency(plan.monthlyPayment)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Principal: {formatCurrency(plan.totalAmount - plan.totalInterest)}
                    </div>
                    {plan.totalInterest > 0 && (
                      <div className="text-sm text-orange-500">
                        Interest: {formatCurrency(plan.totalInterest)}
                      </div>
                    )}
                    <div className="text-sm font-medium text-gray-700 border-t pt-2">
                      Total: {formatCurrency(plan.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.months} monthly payments
                    </div>
                    {downPayment > 0 && (
                      <div className="text-xs text-green-600 font-medium">
                        + {formatCurrency(downPayment)} down payment
                      </div>
                    )}
                    {plan.interestRate === 0 && (
                      <div className="text-xs text-green-600 font-medium bg-green-100 p-1 rounded">
                        ✨ Interest-Free!
                      </div>
                    )}
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
                <p>Enter tuition and financial aid amounts to see payment plan options</p>
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
            {getFinanceAmount() > 0 && (
              <div className="mt-4">
                <p className="text-blue-100">
                  Choose from {paymentPlans.length} flexible payment options with {getRateTierDescription()}
                </p>
                <p className="text-blue-100 text-sm">
                  💡 Tip: Higher down payments unlock better interest rates across all terms
                </p>
              </div>
            )}
            {getFinanceAmount() === 0 && getActiveBalance() > 0 && (
              <p className="text-blue-100 mt-4">
                🎉 Fully paid with down payment - No financing needed!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .bg-gray-50 {
            background: white !important;
          }
          button {
            display: none !important;
          }
          input, select {
            border: none !important;
            background: transparent !important;
          }
          .shadow-md {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentPlanCalculator;