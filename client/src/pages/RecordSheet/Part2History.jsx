// D:\Computer Science  - University of Jaffna\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\Part2History.jsx

import React from 'react';

const Part2History = ({ formData, handleChange, handleNestedChange, nextStep, prevStep }) => {
    // Helper function to safely access nested properties and handle undefined
    const getNestedValue = (obj, path, defaultValue = '') => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-8">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Patient Information Form - Part 2</h2>

            {/* Family History of Disorders Section */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6 pb-2 border-b border-blue-200">Family History of Disorders</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <label className="flex items-center text-gray-700">
                        <input
                            type="checkbox"
                            name="devDisorders"
                            checked={getNestedValue(formData, 'familyHistoryOfDisorders.devDisorders', false)}
                            onChange={(e) => handleNestedChange('familyHistoryOfDisorders', e)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        /> Developmental Disorders
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input
                            type="checkbox"
                            name="asd"
                            checked={getNestedValue(formData, 'familyHistoryOfDisorders.asd', false)}
                            onChange={(e) => handleNestedChange('familyHistoryOfDisorders', e)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        /> ASD
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input
                            type="checkbox"
                            name="speechDisorders"
                            checked={getNestedValue(formData, 'familyHistoryOfDisorders.speechDisorders', false)}
                            onChange={(e) => handleNestedChange('familyHistoryOfDisorders', e)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        /> Speech Disorders
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input
                            type="checkbox"
                            name="psychiatricIllness"
                            checked={getNestedValue(formData, 'familyHistoryOfDisorders.psychiatricIllness', false)}
                            onChange={(e) => handleNestedChange('familyHistoryOfDisorders', e)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        /> Psychiatric Illness
                    </label>
                    <label className="flex items-center text-gray-700">
                        <input
                            type="checkbox"
                            name="behavioralProblems"
                            checked={getNestedValue(formData, 'familyHistoryOfDisorders.behavioralProblems', false)}
                            onChange={(e) => handleNestedChange('familyHistoryOfDisorders', e)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        /> Behavioral Problems
                    </label>
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="familyHistoryOther" className="block text-gray-700 text-sm font-medium mb-1">Other (Specify):</label>
                    <input
                        type="text"
                        id="familyHistoryOther"
                        name="other"
                        value={getNestedValue(formData, 'familyHistoryOfDisorders.other')}
                        onChange={(e) => handleNestedChange('familyHistoryOfDisorders', e)}
                        className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                </div>
            </div>

            {/* Birth and Perinatal History Section */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6 pb-2 border-b border-blue-200">Birth and Perinatal History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="birthWeight" className="block text-gray-700 text-sm font-medium mb-1">Birth Weight (kg):</label>
                        <input
                            type="number"
                            id="birthWeight"
                            name="birthWeight"
                            value={getNestedValue(formData, 'birthHistory.birthWeight')}
                            onChange={(e) => handleNestedChange('birthHistory', e)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="typeOfDelivery" className="block text-gray-700 text-sm font-medium mb-1">Type of Delivery:</label>
                        <input
                            type="text"
                            id="typeOfDelivery"
                            name="typeOfDelivery"
                            value={getNestedValue(formData, 'birthHistory.typeOfDelivery')}
                            onChange={(e) => handleNestedChange('birthHistory', e)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label htmlFor="mothersHealthDuringPregnancyDelivery" className="block text-gray-700 text-sm font-medium mb-1">Mother's Health During Pregnancy/Delivery:</label>
                        <textarea
                            id="mothersHealthDuringPregnancyDelivery"
                            name="mothersHealthDuringPregnancyDelivery"
                            value={getNestedValue(formData, 'birthHistory.mothersHealthDuringPregnancyDelivery')}
                            onChange={(e) => handleNestedChange('birthHistory', e)}
                            rows="3"
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                        ></textarea>
                    </div>
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label htmlFor="otherComplicationsDuringPregnancyDeliveryAfterDelivery" className="block text-gray-700 text-sm font-medium mb-1">Other Complications (Pregnancy/Delivery/After Delivery):</label>
                        <textarea
                            id="otherComplicationsDuringPregnancyDeliveryAfterDelivery"
                            name="otherComplicationsDuringPregnancyDeliveryAfterDelivery"
                            value={getNestedValue(formData, 'birthHistory.otherComplicationsDuringPregnancyDeliveryAfterDelivery')}
                            onChange={(e) => handleNestedChange('birthHistory', e)}
                            rows="3"
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Review of System Section */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6 pb-2 border-b border-blue-200">Review of System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="visionProblem" className="block text-gray-700 text-sm font-medium mb-1">Vision Problem:</label>
                        <input
                            type="text"
                            id="visionProblem"
                            name="visionProblem"
                            value={getNestedValue(formData, 'reviewOfSystem.visionProblem')}
                            onChange={(e) => handleNestedChange('reviewOfSystem', e)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="hearingProblem" className="block text-gray-700 text-sm font-medium mb-1">Hearing Problem:</label>
                        <input
                            type="text"
                            id="hearingProblem"
                            name="hearingProblem"
                            value={getNestedValue(formData, 'reviewOfSystem.hearingProblem')}
                            onChange={(e) => handleNestedChange('reviewOfSystem', e)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="gastroIntestinalProblems" className="block text-gray-700 text-sm font-medium mb-1">Gastro-Intestinal Problems:</label>
                        <input
                            type="text"
                            id="gastroIntestinalProblems"
                            name="gastroIntestinalProblems"
                            value={getNestedValue(formData, 'reviewOfSystem.gastroIntestinalProblems')}
                            onChange={(e) => handleNestedChange('reviewOfSystem', e)}
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>
                    {/* Growth & Weight Problems */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-lg font-medium text-gray-800 mb-2 mt-4">Growth & Weight Problems</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label htmlFor="height" className="block text-gray-700 text-sm font-medium mb-1">Height (cm):</label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={getNestedValue(formData, 'reviewOfSystem.growthWeightProblems.height')}
                                    onChange={(e) => handleNestedChange('reviewOfSystem.growthWeightProblems', e)}
                                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="weight" className="block text-gray-700 text-sm font-medium mb-1">Weight (kg):</label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    value={getNestedValue(formData, 'reviewOfSystem.growthWeightProblems.weight')}
                                    onChange={(e) => handleNestedChange('reviewOfSystem.growthWeightProblems', e)}
                                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label htmlFor="neurologicalProblems" className="block text-gray-700 text-sm font-medium mb-1">Neurological Problems (seizures, shunts, bleed, stroke, meningitis):</label>
                        <textarea
                            id="neurologicalProblems"
                            name="neurologicalProblems"
                            value={getNestedValue(formData, 'reviewOfSystem.neurologicalProblems')}
                            onChange={(e) => handleNestedChange('reviewOfSystem', e)}
                            rows="3"
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                        ></textarea>
                    </div>
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label htmlFor="anyOtherSpecifyReview" className="block text-gray-700 text-sm font-medium mb-1">Any Other (Specify):</label>
                        <textarea
                            id="anyOtherSpecifyReview"
                            name="anyOtherSpecifyReview"
                            value={getNestedValue(formData, 'reviewOfSystem.anyOtherSpecifyReview')}
                            onChange={(e) => handleNestedChange('reviewOfSystem', e)}
                            rows="3"
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Developmental History Section */}
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6 pb-2 border-b border-blue-200">Developmental History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col col-span-1 md:col-span-2">
                        <label htmlFor="speech" className="block text-gray-700 text-sm font-medium mb-1">Speech:</label>
                        <textarea
                            id="speech"
                            name="speech"
                            value={getNestedValue(formData, 'developmentalHistory.speech')}
                            onChange={(e) => handleNestedChange('developmentalHistory', e)}
                            rows="3"
                            className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                        ></textarea>
                    </div>
                    {/* Motor */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-lg font-medium text-gray-800 mb-2 mt-4">Motor</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label htmlFor="grossMotor" className="block text-gray-700 text-sm font-medium mb-1">Gross Motor:</label>
                                <textarea
                                    id="grossMotor"
                                    name="grossMotor"
                                    value={getNestedValue(formData, 'developmentalHistory.motor.grossMotor')}
                                    onChange={(e) => handleNestedChange('developmentalHistory.motor', e)}
                                    rows="3"
                                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                                ></textarea>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="fineMotor" className="block text-gray-700 text-sm font-medium mb-1">Fine Motor:</label>
                                <textarea
                                    id="fineMotor"
                                    name="fineMotor"
                                    value={getNestedValue(formData, 'developmentalHistory.motor.fineMotor')}
                                    onChange={(e) => handleNestedChange('developmentalHistory.motor', e)}
                                    rows="3"
                                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition duration-200"
                >
                    Previous
                </button>
                <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Part2History;