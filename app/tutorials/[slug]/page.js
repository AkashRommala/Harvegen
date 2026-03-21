'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FiArrowLeft, FiClock, FiTarget, FiBookOpen, FiSettings, FiCpu, FiGlobe, FiRadio, FiLayers, FiDownload, FiCheckCircle, FiCode, FiChevronRight, FiMenu, FiX } from 'react-icons/fi'
import { Button } from '../../../components/ui/button'

// Tutorial data with full content
const tutorialsData = {
  'introduction-to-embedded-c': {
    title: 'Introduction to Embedded C',
    desc: 'Data types, bitwise operations, memory layout and direct hardware register access.',
    time: '20 min',
    level: 'Beginner',
    icon: 'FiBookOpen',
    image: '/vlsi 2.jpeg',
    category: 'Embedded C',
    prerequisites: ['Basic C programming knowledge', 'Understanding of binary/hex number systems'],
    learningPoints: ['Understand embedded C fundamentals and why it differs from standard C', 'Learn hardware register access and memory-mapped I/O', 'Master bitwise operations for efficient bit manipulation', 'Work with memory-mapped peripherals', 'Understand volatile keyword and compiler optimizations', 'Configure GPIO pins for input and output'],
    topics: ['Data Types', 'Bitwise Operations', 'Memory Layout', 'Register Access', 'Volatile Keyword', 'Bit Manipulation', 'GPIO Configuration', 'Startup Code', 'Linker Scripts', 'Interrupt Basics'],
    exercises: ['Create a simple LED blinking program using direct register access', 'Configure GPIO pins for output mode using register bit manipulation', 'Implement bit masking functions (set, clear, toggle specific bits)', 'Access hardware registers directly using memory-mapped I/O', 'Write a function to check if a specific bit is set in a register', 'Create a program that reads a button state and controls an LED'],
    resources: ['STM32 Reference Manual (RM0008)', 'C Standard Library Documentation (ISO/IEC 9899)', 'ARM Cortex-M Programming Guide', 'Embedded Systems Fundamentals Course', 'Microchip AVR Documentation', 'NXP LPC17xx User Manual'],
    content: [
      { heading: 'Why Embedded C?', text: 'Embedded C is the backbone of firmware development for microcontrollers. It extends standard C with hardware-specific features and optimizations that allow direct manipulation of hardware registers and memory-mapped peripherals. Unlike desktop applications, embedded systems have limited resources (RAM, Flash, CPU), so every byte and cycle counts. Embedded C gives you the low-level control needed to write efficient firmware while maintaining portability across different microcontroller families.' },
      { heading: 'Data Types in Embedded Systems', text: 'Always use fixed-width types like uint8_t, uint16_t, uint32_t from <stdint.h> to ensure consistent behavior across different architectures. Standard C types like int can vary in size between platforms, which can cause subtle bugs. Fixed-width types guarantee exact sizes: uint8_t is always 8 bits (0-255), int16_t is always 16 bits (-32768 to 32767). This predictability is essential when working with hardware registers that have specific bit widths.' },
      { heading: 'Bitwise Operations', text: 'Bitwise operations are essential for embedded systems. They allow direct manipulation of hardware registers and efficient data processing without the overhead of function calls. AND (&), OR (|), XOR (^), and NOT (~) operations let you set, clear, toggle, and test individual bits. Shift operations (<<, >>) are crucial for multiplying or dividing by powers of 2, which is much faster than actual multiplication or division operations on resource-constrained MCUs.' },
      { heading: 'Volatile Keyword', text: 'The volatile keyword is critical for hardware registers. It prevents the compiler from optimizing away reads or writes to memory-mapped hardware. Without volatile, the compiler might cache register values in a CPU register or remove what it considers "redundant" reads. For hardware registers that can change at any time (like external inputs) or that have side effects when written, volatile ensures every access actually happens. Always declare hardware register pointers as volatile.' },
      { heading: 'Memory Layout', text: 'Understanding memory layout is crucial for embedded systems. Most microcontrollers have separate memory regions: Flash for code (read-only, persists after reset), SRAM for variables (read-write, volatile), and sometimes EEPROM for persistent storage. The linker script determines where different sections (.text, .data, .bss) get placed. Knowing how your code and data are arranged helps in optimizing memory usage and understanding startup code.' },
      { heading: 'Register Access', text: 'Hardware peripherals are accessed through memory-mapped registers. Each peripheral has specific addresses defined in the microcontroller\'s reference manual. By casting these addresses to volatile pointers, we can read from and write to hardware registers as if they were regular variables. This direct access is how we configure GPIO pins, set up timers, communicate via UART, and control all other peripherals.' },
    ],
    codeExample: `/*
 * Introduction to Embedded C - LED Blinking Example
 * Target: STM32F103 (or similar ARM Cortex-M MCU)
 * This example demonstrates:
 *   - Memory-mapped register access
 *   - Bitwise operations
 *   - Volatile keyword usage
 *   - Infinite loop for embedded systems
 */

#include <stdint.h>

// Memory-mapped register addresses for GPIOA
// These addresses are specific to STM32F1xx microcontrollers
#define GPIOA_MODER   (*(volatile uint32_t *)0x40020000)  // Mode register
#define GPIOA_ODR     (*(volatile uint32_t *)0x40020014)  // Output data register
#define GPIOA_IDR     (*(volatile uint32_t *)0x40020010)  // Input data register

// Bit manipulation macros for cleaner code
#define SET_BIT(reg, bit)       ((reg) |= (1 << (bit)))
#define CLEAR_BIT(reg, bit)     ((reg) &= ~(1 << (bit)))
#define TOGGLE_BIT(reg, bit)    ((reg) ^= (1 << (bit)))
#define READ_BIT(reg, bit)      (((reg) >> (bit)) & 0x01)

#define LED_PIN     5       // Pin 5 (PA5) - usually connected to LED
#define BUTTON_PIN  0       // Pin 0 (PA0) - usually connected to button

// Simple delay function (not precise, but works for simple demos)
void delay(volatile uint32_t count) {
    while(count--) {
        __asm("nop");  // No-operation instruction
    }
}

int main(void) {
    /*
     * Configure GPIOA Pin 5 as output
     * Each GPIO pin has 2 bits in MODER register:
     *   00 = Input mode (reset state)
     *   01 = General purpose output mode
     *   10 = Alternate function mode
     *   11 = Analog mode
     * 
     * For Pin 5: bits 10-11 in MODER
     * Setting bit 10 (value 4) selects output mode
     */
    SET_BIT(GPIOA_MODER, 10);  // Set pin 5 to output mode
    
    // Main application loop - runs forever
    while(1) {
        // Turn LED on by setting the output pin high
        SET_BIT(GPIOA_ODR, LED_PIN);
        delay(500000);  // Wait approximately 500ms
        
        // Turn LED off by clearing the output pin
        CLEAR_BIT(GPIOA_ODR, LED_PIN);
        delay(500000);  // Wait approximately 500ms
        
        // Alternative: Toggle LED
        // TOGGLE_BIT(GPIOA_ODR, LED_PIN);
    }
    
    // Code never reaches here in embedded systems
    return 0;
}

/*
 * Key Concepts Demonstrated:
 * 
 * 1. Memory-Mapped I/O:
 *    Hardware peripherals are accessed at specific memory addresses.
 *    We cast these addresses to volatile pointers to read/write them.
 * 
 * 2. Volatile Keyword:
 *    Prevents compiler from optimizing away accesses.
 *    Essential for hardware registers that can change unexpectedly.
 * 
 * 3. Bit Manipulation:
 *    Macros like SET_BIT, CLEAR_BIT allow working with individual pins.
 *    This is more efficient than reading/writing entire registers.
 * 
 * 4. Infinite Loop:
 *    Embedded applications typically run forever (no OS to return to).
 *    The while(1) loop keeps the program running.
 */`,
  },
  'gpio-input-output-exti-interrupts': {
    title: 'GPIO: Input, Output & EXTI Interrupts',
    desc: 'Configure digital I/O, pull-up resistors, debounce, and external interrupt lines on STM32.',
    time: '25 min',
    level: 'Beginner',
    icon: 'FiSettings',
    image: '/iot3.jpg',
    category: 'MCU Basics',
    prerequisites: ['Basic C knowledge', 'Understanding of STM32 architecture'],
    learningPoints: ['Configure GPIO pins for input and output', 'Use pull-up/down resistors', 'Implement external interrupts', 'Debounce button inputs'],
    topics: ['GPIO Modes', 'Pull-up/Down Resistors', 'EXTI Configuration', 'Debouncing', 'Interrupt Handling'],
    exercises: ['Configure LED output pin', 'Read button state with polling', 'Set up external interrupt', 'Implement software debounce'],
    resources: ['STM32 GPIO Documentation', 'AN4789 Application Note', 'CubeMX GPIO Configuration'],
    content: [
      { heading: 'GPIO Modes', text: 'STM32 GPIO pins can be configured in multiple modes: Input (floating, pull-up, pull-down), Output (push-pull, open-drain), Alternate function, and Analog mode. Each pin has a 2-bit field in the MODER register.' },
      { heading: 'Configuring Input Pins', text: 'Input configuration requires setting the mode to input and optionally enabling pull-up or pull-down resistors. The IDR (Input Data Register) is used to read the pin state.' },
      { heading: 'External Interrupts (EXTI)', text: 'EXTI lines allow external signals to trigger interrupts. Each line can be configured for rising edge, falling edge, or both. The NVIC (Nested Vector Interrupt Controller) handles interrupt prioritization.' },
      { heading: 'Debouncing', text: 'Mechanical switches bounce when closing, causing multiple transitions. Software debouncing uses delay or counter methods to ensure stable readings. Hardware debouncing uses RC filters or Schmitt triggers.' },
    ],
    codeExample: `// GPIO Initialization for LED and Button
void GPIO_Init(void) {
    GPIO_InitTypeDef GPIO_InitStruct = {0};
    
    // Enable GPIO Clock
    __HAL_RCC_GPIOA_CLK_ENABLE();
    __HAL_RCC_GPIOC_CLK_ENABLE();
    
    // Configure PA5 as output (LED)
    GPIO_InitStruct.Pin = GPIO_PIN_5;
    GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
    GPIO_InitStruct.Pull = GPIO_NOPULL;
    GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
    HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
    
    // Configure PC13 as input with pull-up (Button)
    GPIO_InitStruct.Pin = GPIO_PIN_13;
    GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
    GPIO_InitStruct.Pull = GPIO_PULLUP;
    HAL_GPIO_Init(GPIOC, &GPIO_InitStruct);
}

// Read button state
if (HAL_GPIO_ReadPin(GPIOC, GPIO_PIN_13) == GPIO_PIN_RESET) {
    // Button pressed
}

// Toggle LED
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);`,
  },
  'timers-pwm-generation': {
    title: 'Timers & PWM Generation',
    desc: 'Timer modes, prescaler, ARR. Generate PWM for LED dimming and motor speed control.',
    time: '30 min',
    level: 'Intermediate',
    icon: 'FiClock',
    image: '/vlsi1.jpeg',
    category: 'MCU Basics',
    prerequisites: ['GPIO basics', 'Understanding of clock systems'],
    learningPoints: ['Understand timer architecture', 'Configure prescaler and ARR', 'Generate PWM signals', 'Control LED brightness and motor speed'],
    topics: ['Timer Architecture', 'Prescaler', 'Auto-reload Register', 'PWM Mode', 'Duty Cycle', 'Output Compare'],
    exercises: ['Create 1Hz timer interrupt', 'Generate PWM for LED dimming', 'Configure PWM for servo motor', 'Use input capture for frequency measurement'],
    resources: ['STM32 Timer Reference Manual', 'AN4776 Timer Overview', 'PWM Application Notes'],
    content: [
      { heading: 'Timer Architecture', text: 'STM32 timers consist of three main components: the counter (CNT), the prescaler (PSC), and the auto-reload register (ARR). The counter increments at (PCLK / (PSC+1)) and resets when it reaches ARR, generating an update event.' },
      { heading: 'PWM Mode', text: 'Pulse Width Modulation generates a periodic signal with variable duty cycle. The timer output compare mode (PWM1 or PWM2) controls the output pin based on the counter value compared to the capture/compare register (CCR).' },
      { heading: 'Prescaler Configuration', text: 'The prescaler divides the timer clock to achieve the desired counting frequency. Formula: TimerFreq = PCLK / ((PSC+1) * (ARR+1)). For a 1MHz timer with 1kHz PWM: PSC=16, ARR=999.' },
      { heading: 'Duty Cycle Control', text: 'The duty cycle is determined by CCR/(ARR+1). To change brightness, modify CCR while ARR remains constant. A CCR of 0 gives 0% duty, CCR=ARR gives 100% duty.' },
    ],
    codeExample: `// PWM Initialization for LED Dimming
void PWM_Init(void) {
    TIM_HandleTypeDef htim2 = {0};
    
    htim2.Instance = TIM2;
    htim2.Init.Prescaler = 16000 - 1;    // 16MHz / 16000 = 1kHz
    htim2.Init.Period = 100 - 1;          // 1kHz / 100 = 10Hz PWM frequency
    htim2.Init.CounterMode = TIM_COUNTERMODE_UP;
    HAL_TIM_PWM_Init(&htim2);
    
    // Configure PWM channel
    TIM_OC_InitTypeDef sConfig = {0};
    sConfig.OCMode = TIM_OCMODE_PWM1;
    sConfig.Pulse = 50;                   // 50% duty cycle
    sConfig.OCPolarity = TIM_OCPOLARITY_HIGH;
    HAL_TIM_PWM_ConfigChannel(&htim2, &sConfig, TIM_CHANNEL_1);
    
    HAL_TIM_PWM_Start(&htim2, TIM_CHANNEL_1);
}

// Change brightness (0-100)
void setBrightness(uint8_t percent) {
    __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, percent);
}`,
  },
  'uart-from-config-to-circular-buffers': {
    title: 'UART: From Config to Circular Buffers',
    desc: 'Set baud rate, interrupt RX, ring buffer, and serial debugging.',
    time: '35 min',
    level: 'Intermediate',
    icon: 'FiRadio',
    image: '/vlsi 2.jpg',
    category: 'Protocols',
    prerequisites: ['GPIO basics', 'Understanding of interrupts'],
    content: [
      { heading: 'UART Fundamentals', text: 'UART is a serial communication protocol.' },
      { heading: 'Circular Buffers', text: 'A circular buffer wraps around for efficient FIFO storage.' },
    ],
    codeExample: `typedef struct {
    volatile uint8_t buffer[256];
    volatile uint16_t head;
    volatile uint16_t tail;
} CircularBuffer;`,
  },
  'freertos-tasks-scheduling': {
    title: 'FreeRTOS: Tasks & Scheduling',
    desc: 'Create tasks, understand preemptive scheduling, priorities, and the tick timer.',
    time: '50 min',
    level: 'Advanced',
    icon: 'FiLayers',
    image: '/iot2.jpg',
    category: 'RTOS',
    prerequisites: ['C programming', 'Understanding of interrupts'],
    content: [
      { heading: 'Introduction to RTOS', text: 'An RTOS allows multiple tasks to run concurrently.' },
      { heading: 'Creating Tasks', text: 'Each task has its own stack and can be in various states.' },
    ],
    codeExample: `void vBlinkTask(void *pvParameters) {
    while(1) {
        HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
        vTaskDelay(pdMS_TO_TICKS(500));
    }
}`,
  },
  'dma-zero-cpu-peripheral-transfers': {
    title: 'DMA: Zero-CPU Peripheral Transfers',
    desc: 'Configure DMA for UART, ADC, and SPI to maximise MCU throughput.',
    time: '45 min',
    level: 'Advanced',
    icon: 'FiDownload',
    image: '/iot.jpeg',
    category: 'RTOS',
    prerequisites: ['UART/ADC/SPI basics', 'Understanding of memory'],
    content: [
      { heading: 'What is DMA?', text: 'Direct Memory Access allows peripherals to transfer data without CPU.' },
      { heading: 'DMA Controllers', text: 'STM32 has DMA controllers with multiple channels.' },
    ],
    codeExample: `void DMA_Init(void) {
    hdma_adc1.Instance = DMA2_Stream0;
    hdma_adc1.Init.Direction = DMA_PERIPH_TO_MEMORY;
    HAL_DMA_Init(&hdma_adc1);
}`,
  },

  'pointers-memory-embedded-c': {
    title: 'Pointers & Memory in Embedded C',
    desc: 'Stack vs heap, volatile keyword, const correctness, and memory-mapped registers.',
    time: '30 min',
    level: 'Intermediate',
    icon: 'FiTarget',
    image: '/vlsi 2.jpg',
    category: 'Embedded C',
    prerequisites: ['Basic C programming', 'Understanding of memory types'],
    content: [
      { heading: 'Pointers in Embedded Systems', text: 'Pointers are used extensively for hardware register access.' },
      { heading: 'The volatile Keyword', text: 'Volatile tells the compiler not to optimize away reads/writes.' },
      { heading: 'Const Correctness', text: 'Use const for read-only parameters and flash storage.' },
      { heading: 'Memory-Mapped Registers', text: 'Access hardware registers through pointer dereferencing.' },
    ],
    codeExample: `#define GPIOA_ODR (*(volatile uint32_t *)0x40020014)
#define LED_PIN 5

void led_on(void) {
    GPIOA_ODR |= (1 << LED_PIN);
}`,
  },

  'bitwise-operations-deep-dive': {
    title: 'Bitwise Operations Deep Dive',
    desc: 'AND, OR, XOR, shifts, bit masking techniques for register configuration.',
    time: '25 min',
    level: 'Beginner',
    icon: 'FiSettings',
    image: '/iot3.jpg',
    category: 'Embedded C',
    prerequisites: ['Basic C knowledge', 'Binary and hexadecimal number systems'],
    content: [
      { heading: 'Bitwise AND, OR, XOR', text: 'Fundamental bitwise operations for mask and manipulation.' },
      { heading: 'Shift Operations', text: 'Left and right shifts for multiplying/dividing by powers of 2.' },
      { heading: 'Bit Masking', text: 'Extract, set, clear, and toggle specific bits in registers.' },
    ],
    codeExample: `#define SET_BIT(reg, bit) ((reg) |= (1 << (bit)))
#define CLEAR_BIT(reg, bit) ((reg) &= ~(1 << (bit)))
#define TOGGLE_BIT(reg, bit) ((reg) ^= (1 << (bit)))`,
  },

  'structures-unions-embedded': {
    title: 'Structures & Unions in Embedded Systems',
    desc: 'Pack alignment, bit-fields, and creating register maps with structures.',
    time: '35 min',
    level: 'Intermediate',
    icon: 'FiLayers',
    image: '/vlsi1.jpeg',
    category: 'Embedded C',
    prerequisites: ['C structures basics', 'Understanding of data types'],
    content: [
      { heading: 'Structure Packing', text: 'Use #pragma pack to control memory alignment.' },
      { heading: 'Bit Fields', text: 'Define bit-level access within structures.' },
      { heading: 'Register Maps', text: 'Create hardware register definitions using structures.' },
    ],
    codeExample: `typedef struct {
    volatile uint32_t MODER;
    volatile uint32_t ODR;
    volatile uint32_t IDR;
} GPIO_TypeDef;

#define GPIOA ((GPIO_TypeDef *)0x40020000)`,
  },

  'interrupt-handling-isr-design': {
    title: 'Interrupt Handling & ISR Design',
    desc: 'Writing interrupt service routines, context saving, and critical sections.',
    time: '40 min',
    level: 'Advanced',
    icon: 'FiCpu',
    image: '/iot.jpeg',
    category: 'Embedded C',
    prerequisites: ['Understanding of interrupts', 'Assembly language basics'],
    content: [
      { heading: 'ISR Fundamentals', text: 'Interrupt Service Routines must be short and fast.' },
      { heading: 'Context Saving', text: 'ISR must save and restore processor state.' },
      { heading: 'Critical Sections', text: 'Use critical sections to protect shared resources.' },
    ],
    codeExample: `void EXTI0_IRQHandler(void) {
    EXTI->PR |= EXTI_PR_PR0;
    handle_button_press();
}

void critical_section(void) {
    __disable_irq();
    shared_variable++;
    __enable_irq();
}`,
  },

  'memory-management-embedded': {
    title: 'Memory Management in Embedded',
    desc: 'Flash, SRAM, EEPROM usage, linker scripts, and memory optimization.',
    time: '45 min',
    level: 'Advanced',
    icon: 'FiDownload',
    image: '/iot2.jpg',
    category: 'Embedded C',
    prerequisites: ['C pointers', 'Linker script basics'],
    content: [
      { heading: 'Memory Types', text: 'Understand Flash, SRAM, and EEPROM characteristics.' },
      { heading: 'Linker Scripts', text: 'Define memory sections and their placement.' },
      { heading: 'Memory Optimization', text: 'Techniques to reduce RAM and Flash usage.' },
    ],
    codeExample: `static uint8_t buffer[256] __attribute__((section(".dma")));
const uint32_t lookup_table[] __attribute__((section(".flash"))) = {
    0, 1, 4, 9, 16, 25
};`,
  },

  'preprocessor-directives-macros': {
    title: 'Preprocessor Directives & Macros',
    desc: '#define, #ifdef, inline functions, and creating efficient macros.',
    time: '25 min',
    level: 'Beginner',
    icon: 'FiCode',
    image: '/vlsi 2.jpeg',
    category: 'Embedded C',
    prerequisites: ['Basic C knowledge'],
    content: [
      { heading: 'Macro Basics', text: 'Use #define for constants and inline code.' },
      { heading: 'Conditional Compilation', text: '#ifdef for compile-time configuration.' },
      { heading: 'Token Pasting', text: '## operator for building identifiers.' },
    ],
    codeExample: `#define BIT(x) (1 << (x))
#define SET_REG(reg, val) ((reg) = (val))

#ifdef DEBUG
    #define LOG(x) printf(x)
#else
    #define LOG(x)
#endif`,
  },

  'fixed-point-arithmetic': {
    title: 'Fixed-Point Arithmetic',
    desc: 'Q format, scaling, and implementing DSP algorithms without FPU.',
    time: '40 min',
    level: 'Advanced',
    icon: 'FiTarget',
    image: '/iot3.jpg',
    category: 'Embedded C',
    prerequisites: ['Understanding of integers', 'Basic DSP concepts'],
    content: [
      { heading: 'Q Format', text: 'Represent fractional numbers using fixed-point format.' },
      { heading: 'Scaling', text: 'Convert between floating-point and fixed-point.' },
      { heading: 'Arithmetic Operations', text: 'Addition, multiplication, division in fixed-point.' },
    ],
    codeExample: `typedef int32_t q15_t;
#define Q15_SHIFT 15

q15_t q15_mul(q15_t a, q15_t b) {
    return (q15_t)((((int64_t)a * b) + (1 << (Q15_SHIFT - 1))) >> Q15_SHIFT);
}`,
  },

  'error-handling-asserts': {
    title: 'Error Handling & Asserts',
    desc: 'Debug assertions, error codes, and writing robust firmware.',
    time: '20 min',
    level: 'Beginner',
    icon: 'FiSettings',
    image: '/vlsi1.jpeg',
    category: 'Embedded C',
    prerequisites: ['Basic C knowledge'],
    content: [
      { heading: 'Assert Macros', text: 'Use assertions to catch programming errors.' },
      { heading: 'Error Codes', text: 'Define and propagate error conditions.' },
      { heading: 'Error Handling Strategies', text: 'Recovery, reporting, and graceful degradation.' },
    ],
    codeExample: `#include <assert.h>

typedef enum {
    ERR_OK = 0,
    ERR_TIMEOUT,
    ERR_INVALID_PARAM,
    ERR_HW_ERROR
} error_t;

error_t init_peripheral(void *config) {
    if (config == NULL) return ERR_INVALID_PARAM;
    return ERR_OK;
}`,
  },

  'code-optimization-techniques': {
    title: 'Code Optimization Techniques',
    desc: 'Loop unrolling, function inlining, and reducing code size.',
    time: '35 min',
    level: 'Intermediate',
    icon: 'FiLayers',
    image: '/iot.jpeg',
    category: 'Embedded C',
    prerequisites: ['C programming', 'Compiler basics'],
    content: [
      { heading: 'Compiler Optimizations', text: 'Understand -O flags and optimization levels.' },
      { heading: 'Loop Optimization', text: 'Unroll loops, use while instead of for when appropriate.' },
      { heading: 'Function Inlining', text: 'Mark small functions as inline.' },
    ],
    codeExample: `// Loop unrolling
for (int i = 0; i < N; i += 4) {
    sum += data[i];
    sum += data[i+1];
    sum += data[i+2];
    sum += data[i+3];
}

static inline uint32_t read_reg(volatile uint32_t *addr) {
    return *addr;
}`,
  },

  'linker-scripts-memory-maps': {
    title: 'Linker Scripts & Memory Maps',
    desc: 'Understanding linker scripts, sections, and memory layout.',
    time: '45 min',
    level: 'Advanced',
    icon: 'FiDownload',
    image: '/iot2.jpg',
    category: 'Embedded C',
    prerequisites: ['Memory management', 'Build process knowledge'],
    content: [
      { heading: 'Linker Script Basics', text: 'Define memory regions and sections.' },
      { heading: 'Sections', text: '.text, .data, .bss, .rodata placement.' },
      { heading: 'Memory Layout', text: 'Map code to Flash and variables to RAM.' },
    ],
    codeExample: `MEMORY
{
    FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 256K
    RAM (rwx) : ORIGIN = 0x20000000, LENGTH = 64K
}

SECTIONS
{
    .text : { *(.text*) } > FLASH
    .data : { *(.data*) } > RAM AT> FLASH
}`,
  },

  'startup-code-boot-process': {
    title: 'Startup Code & Boot Process',
    desc: 'Reset handler, vector table, and initializing variables before main.',
    time: '40 min',
    level: 'Advanced',
    icon: 'FiCpu',
    image: '/vlsi 2.jpg',
    category: 'Embedded C',
    prerequisites: ['Linker scripts', 'Assembly language'],
    content: [
      { heading: 'Boot Sequence', text: 'Understand MCU reset to main() flow.' },
      { heading: 'Vector Table', text: 'Interrupt handlers and reset handler addresses.' },
      { heading: 'Data Initialization', text: 'Copy .data section from Flash to RAM.' },
    ],
    codeExample: `void Reset_Handler(void) {
    extern uint32_t _sidata, _sdata, _edata;
    uint32_t *src = &_sidata;
    uint32_t *dest = &_sdata;
    while (dest < &_edata) *dest++ = *src++;
    
    extern uint32_t _sbss, _ebss;
    dest = &_sbss;
    while (dest < &_ebss) *dest++ = 0;
    
    main();
}`,
  },

  'writing-clean-embedded-c': {
    title: 'Writing Clean Embedded C',
    desc: 'Naming conventions, code organization, and best practices.',
    time: '30 min',
    level: 'Beginner',
    icon: 'FiBookOpen',
    image: '/iot3.jpg',
    category: 'Embedded C',
    prerequisites: ['Basic C knowledge'],
    content: [
      { heading: 'Naming Conventions', text: 'Use consistent prefixes and meaningful names.' },
      { heading: 'Code Organization', text: 'Modular design with clear header files.' },
      { heading: 'Documentation', text: 'Comment complex logic and document APIs.' },
    ],
    codeExample: `typedef enum {
    LED_STATE_OFF = 0,
    LED_STATE_ON,
    LED_STATE_BLINKING
} led_state_t;

void led_init(led_config_t *config);
void led_set_state(led_state_t state);

#define LED_BLINK_PERIOD_MS 500`,
  },

  'unit-testing-embedded': {
    title: 'Unit Testing for Embedded',
    desc: 'Unity test framework, mocking hardware, and TDD for firmware.',
    time: '50 min',
    level: 'Intermediate',
    icon: 'FiTarget',
    image: '/vlsi1.jpeg',
    category: 'Embedded C',
    prerequisites: ['C programming', 'Testing concepts'],
    content: [
      { heading: 'Unity Test Framework', text: 'Introduction to Unity for embedded testing.' },
      { heading: 'Mocking Hardware', text: 'Create mocks for hardware dependencies.' },
      { heading: 'Test-Driven Development', text: 'Write tests before implementation.' },
    ],
    codeExample: `#include "Unity.h"

void test_led_on_sets_pin_high(void) {
    led_on(LED_PIN_5);
    TEST_ASSERT_TRUE(mock_gpio_write_called_with(LED_PIN_5, HIGH));
}

void test_led_toggle_flips_state(void) {
    led_on(LED_PIN_5);
    led_toggle(LED_PIN_5);
    TEST_ASSERT_EQUAL(GPIO_LOW, led_read(LED_PIN_5));
}`,
  },

  'debugging-gdb-openocd': {
    title: 'Debugging with GDB & OpenOCD',
    desc: 'JTAG debugging, breakpoints, and inspecting memory.',
    time: '45 min',
    level: 'Intermediate',
    icon: 'FiSettings',
    image: '/iot.jpeg',
    category: 'Embedded C',
    prerequisites: ['GDB basics', 'JTAG/SWD understanding'],
    content: [
      { heading: 'GDB Basics', text: 'Connect to target and control execution.' },
      { heading: 'Breakpoints', text: 'Set software and hardware breakpoints.' },
      { heading: 'Memory Inspection', text: 'Examine registers, memory, and variables.' },
    ],
    codeExample: `# GDB commands
target remote localhost:3333
monitor reset halt
load
break main
continue

# Inspect variables
print variable_name
display/4xw 0x20000000

# Memory examination
x/16xb buffer`,
  },
}

// Tutorial categories with their items - matching Tutorials.jsx
const tutorialCategories = {
  'Embedded C': [
    { id: 'introduction-to-embedded-c', label: 'Introduction to Embedded C', icon: FiBookOpen },
    { id: 'pointers-memory-embedded-c', label: 'Pointers & Memory', icon: FiTarget },
    { id: 'bitwise-operations-deep-dive', label: 'Bitwise Operations', icon: FiSettings },
    { id: 'structures-unions-embedded', label: 'Structures & Unions', icon: FiLayers },
    { id: 'interrupt-handling-isr-design', label: 'Interrupt Handling', icon: FiCpu },
    { id: 'memory-management-embedded', label: 'Memory Management', icon: FiDownload },
    { id: 'preprocessor-directives-macros', label: 'Preprocessor & Macros', icon: FiCode },
    { id: 'fixed-point-arithmetic', label: 'Fixed-Point Arithmetic', icon: FiTarget },
    { id: 'error-handling-asserts', label: 'Error Handling', icon: FiSettings },
    { id: 'code-optimization-techniques', label: 'Code Optimization', icon: FiLayers },
    { id: 'linker-scripts-memory-maps', label: 'Linker Scripts', icon: FiDownload },
    { id: 'startup-code-boot-process', label: 'Startup Code', icon: FiCpu },
    { id: 'writing-clean-embedded-c', label: 'Writing Clean Embedded C', icon: FiBookOpen },
    { id: 'unit-testing-embedded', label: 'Unit Testing', icon: FiTarget },
    { id: 'debugging-gdb-openocd', label: 'Debugging GDB & OpenOCD', icon: FiSettings },
  ],
  'MCU Basics': [
    { id: 'gpio-input-output-exti-interrupts', label: 'GPIO, Input & EXTI', icon: FiSettings },
    { id: 'timers-pwm-generation', label: 'Timers & PWM', icon: FiClock },
    { id: 'adc-analog-to-digital-conversion', label: 'ADC Conversion', icon: FiCpu },
    { id: 'watchdog-timer-implementation', label: 'Watchdog Timer', icon: FiTarget },
    { id: 'clock-configuration-pll-setup', label: 'Clock & PLL Setup', icon: FiLayers },
    { id: 'low-power-modes-sleep', label: 'Low Power Modes', icon: FiDownload },
    { id: 'rtc-real-time-clock', label: 'RTC Clock', icon: FiClock },
    { id: 'comparator-opamp-config', label: 'Comparator & Op-Amp', icon: FiCpu },
    { id: 'gpio-interfacing-basics', label: 'GPIO Interfacing', icon: FiSettings },
    { id: 'pwm-motor-control', label: 'PWM Motor Control', icon: FiLayers },
    { id: 'input-capture-encoders', label: 'Input Capture', icon: FiTarget },
    { id: 'dac-digital-analog-output', label: 'DAC Output', icon: FiGlobe },
    { id: 'backup-domain-vbat', label: 'Backup Domain', icon: FiDownload },
    { id: 'system-configuration-boot', label: 'System Config', icon: FiCpu },
    { id: 'hardware-debugging-tips', label: 'Hardware Debugging', icon: FiSettings },
  ],
  'Protocols': [
    { id: 'uart-from-config-to-circular-buffers', label: 'UART & Circular Buffers', icon: FiRadio },
    { id: 'i2c-sensors-oled-displays', label: 'I2C, Sensors & OLED', icon: FiGlobe },
    { id: 'spi-high-speed-communication', label: 'SPI Communication', icon: FiLayers },
    { id: 'can-bus-automotive-networks', label: 'CAN Bus', icon: FiDownload },
    { id: 'usb-device-mode', label: 'USB Device Mode', icon: FiCpu },
    { id: 'bluetooth-le-ble-projects', label: 'Bluetooth LE', icon: FiTarget },
    { id: 'one-wire-protocol', label: 'One-Wire Protocol', icon: FiSettings },
    { id: 'i2s-audio-interface', label: 'I2S Audio', icon: FiGlobe },
    { id: 'ethernet-lwip-stack', label: 'Ethernet lwIP', icon: FiLayers },
    { id: 'uart-dma-optimization', label: 'UART DMA', icon: FiRadio },
    { id: 'spi-dma-transfers', label: 'SPI DMA Transfers', icon: FiDownload },
    { id: 'i2c-error-handling', label: 'I2C Error Handling', icon: FiTarget },
    { id: 'modbus-rtu-protocol', label: 'Modbus RTU', icon: FiCpu },
    { id: 'wireless-communication', label: 'Wireless Comm', icon: FiGlobe },
    { id: 'ir-remote-control', label: 'IR Remote Control', icon: FiSettings },
  ],
  'RTOS': [
    { id: 'freertos-tasks-scheduling', label: 'FreeRTOS Tasks', icon: FiLayers },
    { id: 'freertos-queues-semaphores', label: 'Queues & Semaphores', icon: FiDownload },
    { id: 'freertos-memory-management', label: 'Memory Management', icon: FiCpu },
    { id: 'freertos-interrupt-management', label: 'Interrupt Management', icon: FiTarget },
    { id: 'freertos-software-timers', label: 'Software Timers', icon: FiClock },
    { id: 'freertos-debugging-profiling', label: 'Debugging & Profiling', icon: FiSettings },
    { id: 'freertos-task-notifications', label: 'Task Notifications', icon: FiLayers },
    { id: 'freertos-event-groups', label: 'Event Groups', icon: FiDownload },
    { id: 'freertos-stream-buffers', label: 'Stream Buffers', icon: FiCpu },
    { id: 'freertos-message-buffers', label: 'Message Buffers', icon: FiTarget },
    { id: 'freertos-tickless-idle', label: 'Tickless Idle', icon: FiGlobe },
    { id: 'freertos-mpu-protection', label: 'MPU Protection', icon: FiSettings },
    { id: 'freertos-porting-guide', label: 'Porting Guide', icon: FiLayers },
    { id: 'freertos-tick-hook', label: 'Tick Hook Functions', icon: FiDownload },
    { id: 'freertos-priority-inversion', label: 'Priority Inversion', icon: FiCpu },
  ],
}

// Default menu items
const menuItems = tutorialCategories['Embedded C']



const iconMap = {
  FiBookOpen, FiSettings, FiClock, FiRadio, FiLayers, FiDownload, FiTarget,
  FiCpu, FiGlobe, FiCheckCircle, FiCode
}

function TutorialPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug
  const [tutorial, setTutorial] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState('introduction-to-embedded-c')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (slug && tutorialsData[slug]) {
      setTutorial(tutorialsData[slug])
      setActiveMenu(slug)
    }
    setLoading(false)
    
    // Hide footer and bottom nav on tutorial pages
    const footer = document.querySelector('footer');
    const bottomNav = document.querySelector('#bottom-nav');
    if (footer) footer.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'none';
    
    // Restore footer when leaving the page
    return () => {
      if (footer) footer.style.display = '';
      if (bottomNav) bottomNav.style.display = '';
    };
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Tutorial Not Found</h2>
          <Button onClick={() => router.push('/tutorials')} variant="default">
            Back to Tutorials
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[tutorial.icon] || FiBookOpen

  return (
    <div className="min-h-screen bg-gray-100 tutorial-page">
      {/* Fixed Sidebar - Full Height from top to bottom */}
      <aside className={`w-[300px] bg-white shadow-lg p-4 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto z-40 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:block`}>
        <div>
          {/* Close button for mobile */}
          <div className="flex justify-end mb-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
              {tutorial?.category || 'Tutorials'}
            </h3>
            <ul className="space-y-1">
              {(tutorialCategories[tutorial?.category] || menuItems).map((item) => (
                <li 
                  key={item.id}
                  onClick={() => {
                    router.push(`/tutorials/${item.id}`)
                    setSidebarOpen(false)
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-all ${
                    activeMenu === item.id 
                      ? 'bg-primary-50 text-primary-600 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {activeMenu === item.id && <FiChevronRight className="w-4 h-4" />}
                  <item.icon className={`w-4 h-4 ${activeMenu === item.id ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className="truncate">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content - Scrollable on right side */}
      <div className="lg:ml-[300px] pt-16 min-h-screen">
        <main className="p-4 md:p-6">
          {/* Mobile Menu Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden fixed top-20 left-4 z-50 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          )}

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-4 md:p-8 mb-6">
            <div className="flex items-center gap-2 text-xs md:text-sm mb-3 md:mb-4 opacity-90 flex-wrap">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/tutorials" className="hover:underline">Tutorials</Link>
              <span>/</span>
              <span className="truncate">{tutorial.title}</span>
            </div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold truncate">{tutorial.title}</h1>
                <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs md:text-sm">
                    <FiClock className="w-3 h-3 md:w-4 md:h-4" /> {tutorial.time}
                  </span>
                  <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-semibold ${
                    tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-300' : 
                    tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' : 
                    'bg-red-500/20 text-red-300'
                  }`}>{tutorial.level}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-6">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {tutorial.desc}
              </p>

              {/* What You'll Learn */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiCheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-900">What You'll Learn</h3>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tutorial.learningPoints?.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {point}
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-green-600 mt-0.5">✓</span>Understanding core concepts</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-green-600 mt-0.5">✓</span>Practical implementation skills</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-green-600 mt-0.5">✓</span>Best practices and patterns</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-green-600 mt-0.5">✓</span>Debugging and optimization</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Topics Covered */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Topics Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {tutorial.topics?.map((topic, index) => (
                    <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {topic}
                    </span>
                  )) || (
                    <>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">Fundamentals</span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">Practical Examples</span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">Best Practices</span>
                    </>
                  )}
                </div>
              </div>

              {/* Main Content Sections */}
              <div className="space-y-6 mb-8">
                {tutorial.content?.map((section, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{section.heading}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{section.text}</p>
                  </div>
                ))}
              </div>

              {/* Code Example */}
              <div className="bg-gray-900 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiCode className="w-5 h-5 text-primary-400" />
                  <h3 className="text-lg font-bold text-white">Code Example</h3>
                </div>
                <pre className="overflow-x-auto">
                  <code className="text-sm font-mono text-gray-100">
                    {tutorial.codeExample}
                  </code>
                </pre>
              </div>

              {/* Practice Exercises */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiTarget className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-bold text-gray-900">Practice Exercises</h3>
                </div>
                <ul className="space-y-2">
                  {tutorial.exercises?.map((exercise, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-yellow-600 font-bold">{index + 1}.</span>
                      {exercise}
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-yellow-600 font-bold">1.</span>Implement the concepts in your own project</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-yellow-600 font-bold">2.</span>Modify the code examples to experiment</li>
                      <li className="flex items-start gap-2 text-sm text-gray-700"><span className="text-yellow-600 font-bold">3.</span>Build a complete working example</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiTarget className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">Prerequisites</h3>
                </div>
                <ul className="space-y-2">
                  {tutorial.prerequisites?.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <FiCheckCircle className="w-4 h-4 text-blue-600" />
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Resources */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiBookOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-bold text-gray-900">Additional Resources</h3>
                </div>
                <ul className="space-y-2">
                  {tutorial.resources?.map((resource, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <FiChevronRight className="w-4 h-4 text-purple-600" />
                      {resource}
                    </li>
                  )) || (
                    <>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><FiChevronRight className="w-4 h-4 text-purple-600" />Official documentation</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><FiChevronRight className="w-4 h-4 text-purple-600" />Related tutorials</li>
                      <li className="flex items-center gap-2 text-sm text-gray-700"><FiChevronRight className="w-4 h-4 text-purple-600" />Community forums</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button onClick={() => router.push('/tutorials')} variant="outline" size="sm">
                  <FiArrowLeft className="w-4 h-4 mr-1" /> Back to Tutorials
                </Button>
                <Button variant="default" size="sm" className="ml-auto">
                  Next Tutorial <FiChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
      </main>
      </div>
    </div>
  )
}

export default TutorialPage
