/**
 * EchoGuard UI strings in English, Hindi, and Telugu.
 * Used so results and labels display in the user's selected result language.
 */

export type ResultLanguage = "auto" | "English" | "Hindi" | "Telugu"

export interface EchoguardStrings {
  // Result cards
  speakerType: string
  detectedLanguage: string
  scamDetected: string
  riskLevel: string
  yes: string
  no: string
  high: string
  medium: string
  low: string
  aiGenerated: string
  human: string
  // AI Explanation section
  geminiAiAnalysis: string
  safetyIntelligence: string
  scamType: string
  whyThisIsAScam: string
  howToAvoidIt: string
  consequencesIfIgnored: string
  // Conversation highlights
  importantHighlights: string
  keyPhrasesFlagged: string
  urgency: string
  paymentRequest: string
  threat: string
  suspiciousClaim: string
  // Fallback / mapToExplanation (when API doesn't return translated)
  noScamIndicators: string
  safetyAnalysisSeeExplanation: string
  noExplanationProvided: string
  reviewExplanationAbove: string
  ignoringScamIndicators: string
  contentNotFlagged: string
  // Buttons & errors
  analyzeAnother: string
  analysisFailed: string
  requestFailed: string
  // Result language select (label only; options stay as-is)
  resultLanguage: string
}

const en: EchoguardStrings = {
  speakerType: "Speaker Type",
  detectedLanguage: "Detected Language",
  scamDetected: "Scam Detected",
  riskLevel: "Risk Level",
  yes: "Yes",
  no: "No",
  high: "High",
  medium: "Medium",
  low: "Low",
  aiGenerated: "AI-Generated",
  human: "Human",
  geminiAiAnalysis: "Gemini AI Analysis",
  safetyIntelligence: "Safety intelligence and prevention advice",
  scamType: "Scam Type",
  whyThisIsAScam: "Why This Is a Scam",
  howToAvoidIt: "How to Avoid It",
  consequencesIfIgnored: "Consequences If Ignored",
  importantHighlights: "Important Conversation Highlights",
  keyPhrasesFlagged: "Key phrases flagged during analysis",
  urgency: "Urgency",
  paymentRequest: "Payment Request",
  threat: "Threat",
  suspiciousClaim: "Suspicious Claim",
  noScamIndicators: "No scam indicators",
  safetyAnalysisSeeExplanation: "Safety analysis (see explanation)",
  noExplanationProvided: "No explanation provided.",
  reviewExplanationAbove: "Review the explanation above for guidance.",
  ignoringScamIndicators: "Ignoring scam indicators may lead to financial loss or identity theft.",
  contentNotFlagged: "Content was not flagged as a scam; general caution still advised.",
  analyzeAnother: "Analyze Another",
  analysisFailed: "Analysis failed",
  requestFailed: "Request failed",
  resultLanguage: "Result language",
}

const hi: EchoguardStrings = {
  speakerType: "वक्ता प्रकार",
  detectedLanguage: "पता चली भाषा",
  scamDetected: "स्कैम पाया गया",
  riskLevel: "जोखिम स्तर",
  yes: "हाँ",
  no: "नहीं",
  high: "उच्च",
  medium: "मध्यम",
  low: "कम",
  aiGenerated: "AI-जनित",
  human: "मानव",
  geminiAiAnalysis: "Gemini AI विश्लेषण",
  safetyIntelligence: "सुरक्षा जानकारी और बचाव सलाह",
  scamType: "स्कैम प्रकार",
  whyThisIsAScam: "यह स्कैम क्यों है",
  howToAvoidIt: "इससे कैसे बचें",
  consequencesIfIgnored: "नज़रअंदाज़ करने पर परिणाम",
  importantHighlights: "महत्वपूर्ण बातचीत के अंश",
  keyPhrasesFlagged: "विश्लेषण में चिह्नित मुख्य वाक्यांश",
  urgency: "जल्दबाजी",
  paymentRequest: "भुगतान का अनुरोध",
  threat: "धमकी",
  suspiciousClaim: "संदिग्ध दावा",
  noScamIndicators: "कोई स्कैम संकेत नहीं",
  safetyAnalysisSeeExplanation: "सुरक्षा विश्लेषण (व्याख्या देखें)",
  noExplanationProvided: "कोई व्याख्या नहीं दी गई।",
  reviewExplanationAbove: "मार्गदर्शन के लिए ऊपर दी गई व्याख्या देखें।",
  ignoringScamIndicators: "स्कैम संकेतों को नज़रअंदाज़ करने से वित्तीय नुकसान या पहचान की चोरी हो सकती है।",
  contentNotFlagged: "सामग्री को स्कैम के रूप में चिह्नित नहीं किया गया; सामान्य सावधानी बरतें।",
  analyzeAnother: "दूसरा विश्लेषण करें",
  analysisFailed: "विश्लेषण विफल",
  requestFailed: "अनुरोध विफल",
  resultLanguage: "परिणाम भाषा",
}

const te: EchoguardStrings = {
  speakerType: "స్పీకర్ రకం",
  detectedLanguage: "గుర్తించిన భాష",
  scamDetected: "స్కామ్ కనిపించింది",
  riskLevel: "రిస్క్ స్థాయి",
  yes: "అవును",
  no: "కాదు",
  high: "అధికం",
  medium: "మధ్యమం",
  low: "తక్కువ",
  aiGenerated: "AI-జనితం",
  human: "మానవం",
  geminiAiAnalysis: "Gemini AI విశ్లేషణ",
  safetyIntelligence: "భద్రతా సమాచారం మరియు నివారణ సలహా",
  scamType: "స్కామ్ రకం",
  whyThisIsAScam: "ఇది స్కామ్ ఎందుకు",
  howToAvoidIt: "దీన్ని ఎలా తప్పించాలి",
  consequencesIfIgnored: "అవజ్ఞ చేస్తే పరిణామాలు",
  importantHighlights: "ముఖ్యమైన సంభాషణ హైలైట్లు",
  keyPhrasesFlagged: "విశ్లేషణలో గుర్తించిన ముఖ్య పదబంధాలు",
  urgency: "అత్యవసరం",
  paymentRequest: "చెల్లింపు అభ్యర్థన",
  threat: "బెదిరింపు",
  suspiciousClaim: "అనుమానాస్పద దావా",
  noScamIndicators: "స్కామ్ సూచనలు లేవు",
  safetyAnalysisSeeExplanation: "భద్రతా విశ్లేషణ (వివరణ చూడండి)",
  noExplanationProvided: "వివరణ ఇవ్వబడలేదు.",
  reviewExplanationAbove: "మార్గదర్శకత్వం కోసం పై వివరణను చూడండి.",
  ignoringScamIndicators: "స్కామ్ సూచనలను అవజ్ఞ చేయడం ఆర్థిక నష్టం లేదా గుర్తింపు దొంగతనానికి దారితీయవచ్చు.",
  contentNotFlagged: "కంటెంట్ స్కామ్ అని గుర్తించబడలేదు; సాధారణ జాగ్రత్త తీసుకోండి.",
  analyzeAnother: "మరొకటి విశ్లేషించండి",
  analysisFailed: "విశ్లేషణ విఫలమైంది",
  requestFailed: "అభ్యర్థన విఫలమైంది",
  resultLanguage: "ఫలిత భాష",
}

const strings: Record<ResultLanguage, EchoguardStrings> = {
  auto: en,
  English: en,
  Hindi: hi,
  Telugu: te,
}

/** Get UI strings for the selected result language. "auto" uses English. */
export function getStrings(lang: ResultLanguage): EchoguardStrings {
  return strings[lang] ?? en
}
