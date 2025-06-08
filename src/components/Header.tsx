const steps = [
    { label: "Postcode", active: true },
    { label: "Waste Type", active: true },
    { label: "Select Skip", active: true },
    { label: "Permit Check", active: false },
    { label: "Choose Date", active: false },
    { label: "Payment", active: false },
];

export default function Header() {
    return (
        <header className="p-4">
            <div className="flex flex-wrap justify-center gap-4 px-4">
                {steps.map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-2 text-sm sm:text-base font-medium">
                        <div className={`flex items-center gap-1 ${step.active ? "text-blue-500" : "text-gray-500"}`}>
                            <span className={step.label === "Select Skip" ? "text-yellow-400" : ""}>
                                {step.label}
                            </span>
                        </div>

                        {idx < steps.length - 1 && (
                            <div className="bg-gray-700 w-6 sm:w-10 h-px mx-1 sm:mx-2" />
                        )}
                    </div>
                ))}
            </div>
        </header>
    );
}
