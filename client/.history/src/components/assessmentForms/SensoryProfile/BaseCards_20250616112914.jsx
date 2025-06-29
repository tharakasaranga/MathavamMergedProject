import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Child Form Components
import AuditoryProcessingForm from "./ChildSensoryProfile2Form/AuditoryProcessingForm";
import VisualProcessingForm from "./ChildSensoryProfile2Form/VisualProcessingForm";
import TouchProcessingForm from "./ChildSensoryProfile2Form/TouchProcessingForm";
import MovementProcessingForm from "./ChildSensoryProfile2Form/MovementProcessingForm";
import BodyPositionProcessingForm from "./ChildSensoryProfile2Form/BodyPositionProcessingForm";
import OralSensoryProcessingForm from "./ChildSensoryProfile2Form/OralSensoryProcessingForm";
import ConductSensoryProcessingForm from "./ChildSensoryProfile2Form/ConductSensoryProcessingForm";
import SocialEmotionalSensoryProcessingForm from "./ChildSensoryProfile2Form/SocialEmotionalSensoryProcessingForm";
import AttentionalSensoryProcessingForm from "./ChildSensoryProfile2Form/AttentionalSensoryProcessingForm";

// Toddler Form Components (import these from your toddler form components)
import ToddlerGeneralProcessingForm from "./ToddlerSensoryProfileForm/GeneralProcessingForm";
import ToddlerAuditoryProcessingForm from "./ToddlerSensoryProfileForm/AuditoryProcessingForm";
import ToddlerVisualProcessingForm from "./ToddlerSensoryProfileForm/VisualProcessingForm";
import ToddlerTouchProcessingForm from "./ToddlerSensoryProfileForm/TouchProcessingForm";
import ToddlerMovementProcessingForm from "./ToddlerSensoryProfileForm/MovementProcessingForm";
import ToddlerOralSensoryProcessingForm from "./ToddlerSensoryProfileForm/OralSensoryProcessingForm";
import ToddlerBehavioralProcessingForm from "./ToddlerSensoryProfileForm/BehavioralSensoryProcessingForm";

function BaseCards({ sensoryName, isExpanded, onToggle, formType, patientId }) {
 
  const renderForm = () => {
    if (formType === "child") {
      // Child Sensory Profile 2 Form (3:0 to 14:11 years)
      switch (sensoryName) {
        case "Auditory Processing":
          return <AuditoryProcessingForm patientId={patientId}  />;
        case "Visual Processing":
          return <VisualProcessingForm patientId={patientId} />;
        case "Touch Processing":
          return <TouchProcessingForm patientId={patientId} />;
        case "Movement Processing":
          return <MovementProcessingForm patientId={patientId} />;
        case "Body Position Processing":
          return <BodyPositionProcessingForm patientId={patientId} />;
        case "Oral Sensory Processing":
          return <OralSensoryProcessingForm patientId={patientId} />;
        case "Conduct Associated with Sensory Processing":
          return <ConductSensoryProcessingForm patientId={patientId} />;
        case "Social Emotional Responses Associated with Sensory Processing":
          return <SocialEmotionalSensoryProcessingForm patientId={patientId} />;
        case "Attentional Responses Associated with Sensory Processing":
          return <AttentionalSensoryProcessingForm patientId={patientId} />;
        default:
          return <div>Form not found</div>;
      }
    } else if (formType === "toddler") {
      // Toddler Sensory Profile Forms (7 to 35 months)
      switch (sensoryName) {
        case "General Processing":
          return <ToddlerGeneralProcessingForm patientId={patientId} />;
        case "Auditory Processing":
          return <ToddlerAuditoryProcessingForm patientId={patientId} />;
        case "Visual Processing":
          return <ToddlerVisualProcessingForm patientId={patientId} />;
        case "Touch Processing":
          return <ToddlerTouchProcessingForm patientId={patientId} />;
        case "Movement Processing":
          return <ToddlerMovementProcessingForm patientId={patientId} />;
        case "Oral Sensory Processing":
          return <ToddlerOralSensoryProcessingForm patientId={patientId} />;
        case "Behavioral Associated with Sensory Processing":
          return <ToddlerBehavioralProcessingForm patientId={patientId} />;
        default:
          return <div>Form not found</div>;
      }
    }
    return <div>Invalid age range</div>;
  };

  return (
    <div className="w-full mb-4 border-x-2 border-b-2 border-gray-600 rounded-3xl overflow-hidden">
      {/* Header: Clickable to expand/collapse */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer font-bold text-lg text-center"
        onClick={onToggle}
      >
        <h3 className="m-0">{sensoryName}</h3>
        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* Expanding Section */}
      {isExpanded && (
        <div className="p-4 bg-white transition-all duration-300 ease-in-out">
          {renderForm()}
        </div>
      )}
    </div>
  );
}

export default BaseCards;
