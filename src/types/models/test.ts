interface LlvmTestAnswer {
    value: string
    isCorrect: boolean
  }
  
  interface LlvmTestQuestion {
    text: string
    typeAnswer: 'single' | 'multiple' 
    answers: LlvmTestAnswer[]
  }
  
  interface LlvmTest {
    title: string
    seed: string 
    source?: string 
    questions: LlvmTestQuestion[]
    counts: number 
  }

  export type {LlvmTest} 