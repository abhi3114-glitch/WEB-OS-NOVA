import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      case '%': return a % b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  const buttonClass = "h-14 text-lg font-medium rounded-xl transition-all hover:scale-105";
  const numberClass = `${buttonClass} bg-white/10 text-white hover:bg-white/20`;
  const operatorClass = `${buttonClass} bg-gradient-to-r from-[#FF006E] to-[#00F5FF] text-white`;
  const specialClass = `${buttonClass} bg-white/5 text-white/60 hover:bg-white/10`;

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] p-6">
      {/* Display */}
      <div className="mb-6 p-6 bg-white/5 rounded-2xl border border-white/10">
        <div className="text-right">
          <div className="text-white/40 text-sm mb-1">
            {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
          </div>
          <div className="text-white text-4xl font-bold truncate">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3 flex-1">
        <Button onClick={handleClear} className={specialClass}>AC</Button>
        <Button onClick={() => handleOperation('%')} className={specialClass}>%</Button>
        <Button onClick={() => setDisplay((parseFloat(display) * -1).toString())} className={specialClass}>+/-</Button>
        <Button onClick={() => handleOperation('÷')} className={operatorClass}>÷</Button>

        <Button onClick={() => handleNumber('7')} className={numberClass}>7</Button>
        <Button onClick={() => handleNumber('8')} className={numberClass}>8</Button>
        <Button onClick={() => handleNumber('9')} className={numberClass}>9</Button>
        <Button onClick={() => handleOperation('×')} className={operatorClass}>×</Button>

        <Button onClick={() => handleNumber('4')} className={numberClass}>4</Button>
        <Button onClick={() => handleNumber('5')} className={numberClass}>5</Button>
        <Button onClick={() => handleNumber('6')} className={numberClass}>6</Button>
        <Button onClick={() => handleOperation('-')} className={operatorClass}>-</Button>

        <Button onClick={() => handleNumber('1')} className={numberClass}>1</Button>
        <Button onClick={() => handleNumber('2')} className={numberClass}>2</Button>
        <Button onClick={() => handleNumber('3')} className={numberClass}>3</Button>
        <Button onClick={() => handleOperation('+')} className={operatorClass}>+</Button>

        <Button onClick={() => handleNumber('0')} className={`${numberClass} col-span-2`}>0</Button>
        <Button onClick={handleDecimal} className={numberClass}>.</Button>
        <Button onClick={handleEquals} className={operatorClass}>=</Button>
      </div>
    </div>
  );
}