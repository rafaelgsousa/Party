function checkString(string) {
    // Verificar se há pelo menos uma letra maiúscula
    const hasCapitalLetter = /[A-Z]/.test(string);
  
    // Verificar se há pelo menos uma letra minúscula
    const hasLowercaseLetter = /[a-z]/.test(string);
  
    // Verificar se há pelo menos um caractere especial
    const hasSpecialCharacter = /[@!&]/.test(string);
  
    // Verificar se não há caracteres como $#%_
    const doNotHaveInvalidCharacters = /^[^$#%_]+$/.test(string);
  
    // Verificar se tem pelo menos 8 caracteres
    const hasAtLessEightCharacters = string.length >= 8;
  
    // Verificar se há pelo menos um número
    const hasNumber = /[0-9]/.test(string);
  
    // Verificar todas as condições
    if (
        hasCapitalLetter &&
        hasLowercaseLetter &&
        hasSpecialCharacter &&
        doNotHaveInvalidCharacters &&
        hasAtLessEightCharacters &&
        hasNumber
    ) {
      return true; // A string atende a todos os critérios
    } else {
      return false; // A string não atende a todos os critérios
    }
}

export default checkString;