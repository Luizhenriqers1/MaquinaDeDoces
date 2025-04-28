const Story = {
    introA: {
      background: 'url(/images/store-front.png)',
      dialogues: [
        "Você está em frente à loja de doces...",
        "O cheiro de algodão doce te atrai para dentro..."
      ]
    },
    inside: {
      background: 'url(/images/store-interior.png)',
      dialogues: [
        "O interior é como uma cápsula do tempo...",
        "Uma atendente se aproxima sorrindo..."
      ]
    },
    interaction: {
      background: 'url(/images/store-counter.png)',
      dialogues: [
        "Atendente: 'Seja bem-vindo à nossa loja!'",
        "'Quer tentar a sorte na máquina de doces?'"
      ]
    },
    exit: {
      background: 'url(/images/store-cat.png)',
      dialogues: ["Atendente: 'Volte sempre que quiser doçura!'"]
    },
    end: {
      background: 'url(/images/store-front.png)',
      dialogues: ["Obrigado por jogar!"],
      credits: `Desenvolvido por:
      Eloisa Alves Silva - 821216356
      Luiz Henrique Ribeiro da Silva - 821224356
      Matias Porto Lima - 82120858
      Samuel Lima Nunes - 821234484`
    }
  };

  export default Story;