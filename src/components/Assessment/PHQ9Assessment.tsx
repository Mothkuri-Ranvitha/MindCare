import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import phq9Data from '../../data/phq9.json';
import { ClipboardCheck, AlertTriangle, Heart, TrendingUp } from 'lucide-react';

const PHQ9Assessment: React.FC = () => {
  const { language } = useLanguage();
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [completed, setCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getSeverityInfo = (score: number) => {
    const { scoring } = phq9Data;
    for (const [key, info] of Object.entries(scoring)) {
      if (score >= info.range[0] && score <= info.range[1]) {
        return { key, ...info };
      }
    }
    return { key: 'minimal', ...scoring.minimal };
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === phq9Data.questions.length) {
      setCompleted(true);
      setShowResults(true);
    }
  };

  const getQuestionText = (question: any) => {
    if (language === 'hindi') return question.hindi;
    if (language === 'tamil') return question.tamil;
    return question.question;
  };

  const getOptionText = (option: any) => {
    if (language === 'hindi') return option.hindi;
    if (language === 'tamil') return option.tamil;
    return option.text;
  };

  const score = calculateScore();
  const severityInfo = getSeverityInfo(score);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Header */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <ClipboardCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
            <p className="text-gray-600">Your PHQ-9 depression screening results</p>
          </div>
        </div>

        {/* Score Display */}
        <div className={`rounded-lg shadow-lg p-8 ${
          severityInfo.color === 'green' ? 'bg-green-50 border border-green-200' :
          severityInfo.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
          severityInfo.color === 'orange' ? 'bg-orange-50 border border-orange-200' :
          'bg-red-50 border border-red-200'
        }`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {severityInfo.color === 'red' && <AlertTriangle className="h-8 w-8 text-red-600 mr-2" />}
              {severityInfo.color === 'orange' && <TrendingUp className="h-8 w-8 text-orange-600 mr-2" />}
              {severityInfo.color === 'yellow' && <Heart className="h-8 w-8 text-yellow-600 mr-2" />}
              {severityInfo.color === 'green' && <Heart className="h-8 w-8 text-green-600 mr-2" />}
              <h3 className={`text-3xl font-bold ${
                severityInfo.color === 'green' ? 'text-green-800' :
                severityInfo.color === 'yellow' ? 'text-yellow-800' :
                severityInfo.color === 'orange' ? 'text-orange-800' :
                'text-red-800'
              }`}>
                Score: {score}/27
              </h3>
            </div>
            <h4 className={`text-xl font-semibold mb-4 ${
              severityInfo.color === 'green' ? 'text-green-800' :
              severityInfo.color === 'yellow' ? 'text-yellow-800' :
              severityInfo.color === 'orange' ? 'text-orange-800' :
              'text-red-800'
            }`}>
              {severityInfo.label}
            </h4>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          
          {score >= 0 && score <= 4 && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Your score suggests minimal depression symptoms. This is a positive result! Continue maintaining your mental wellness with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Regular exercise and healthy sleep patterns</li>
                <li>Staying connected with friends and family</li>
                <li>Practicing stress management techniques</li>
                <li>Engaging in activities you enjoy</li>
              </ul>
            </div>
          )}

          {score >= 5 && score <= 9 && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Your score suggests mild depression symptoms. Consider these supportive steps:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Talk to a counselor or trusted person about how you're feeling</li>
                <li>Maintain regular routines and self-care practices</li>
                <li>Consider peer support groups or online resources</li>
                <li>Monitor your symptoms and take another assessment in 2 weeks</li>
              </ul>
            </div>
          )}

          {score >= 10 && score <= 14 && (
            <div className="space-y-4">
              <p className="text-orange-700 font-medium">
                Your score suggests moderate depression symptoms. We recommend seeking professional support:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Schedule an appointment with a college counselor</li>
                <li>Consider therapy or counseling sessions</li>
                <li>Reach out to trusted friends or family members</li>
                <li>Explore treatment options with a mental health professional</li>
              </ul>
            </div>
          )}

          {score >= 15 && (
            <div className="space-y-4">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-semibold">
                  Your score suggests {score >= 20 ? 'severe' : 'moderately severe'} depression symptoms. 
                  Please seek professional help immediately.
                </p>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Contact a mental health professional today</li>
                <li>Consider reaching out to our crisis support team</li>
                <li>Don't isolate yourself - tell someone you trust how you're feeling</li>
                <li>If you have thoughts of self-harm, seek emergency help immediately</li>
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => setShowResults(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Assessment Again
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Book Counseling Session
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Access Resources
            </button>
            {score >= 10 && (
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Get Immediate Help
              </button>
            )}
          </div>
        </div>

        {/* Crisis Support */}
        {score >= 15 && (
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-red-800">Crisis Support Available 24/7</h3>
            </div>
            <p className="text-red-700 mb-4">
              If you're having thoughts of self-harm or suicide, please reach out immediately:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="tel:022-2754-6669" 
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Call National Helpline: 022-2754-6669
              </a>
              <button className="bg-red-100 hover:bg-red-200 text-red-800 py-3 px-6 rounded-lg font-semibold transition-colors">
                Chat with Crisis Counselor
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <ClipboardCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">PHQ-9 Depression Assessment</h1>
          <p className="text-gray-600">
            This assessment helps screen for depression symptoms. It takes about 5 minutes to complete.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            Over the last 2 weeks, how often have you been bothered by any of the following problems?
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {phq9Data.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {index + 1}. {getQuestionText(question)}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {phq9Data.options.map((option) => (
                <label 
                  key={option.value}
                  className={`relative flex items-center p-4 cursor-pointer rounded-lg border-2 transition-all ${
                    answers[question.id] === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <div className={`text-sm font-medium ${
                      answers[question.id] === option.value ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {getOptionText(option)}
                    </div>
                    <div className={`text-xs mt-1 ${
                      answers[question.id] === option.value ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      Score: {option.value}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress and Submit */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Progress:</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(Object.keys(answers).length / phq9Data.questions.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">
              {Object.keys(answers).length}/{phq9Data.questions.length}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Current Score: <span className="font-semibold">{score}</span>
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== phq9Data.questions.length}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        >
          {Object.keys(answers).length === phq9Data.questions.length 
            ? 'Complete Assessment' 
            : `Answer ${phq9Data.questions.length - Object.keys(answers).length} more questions`
          }
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          <strong>Important:</strong> This assessment is for screening purposes only and does not replace professional medical advice. 
          If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate professional help.
        </p>
      </div>
    </div>
  );
};

export default PHQ9Assessment;