import { useRef, useState } from 'react'

const FaqsCard = (props) => {
  const answerElRef = useRef()
  const [state, setState] = useState(false)
  const [answerH, setAnswerH] = useState('0px')
  const { faqsList, idx } = props

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight
    setState(!state)
    setAnswerH(`${answerElH + 20}px`)
  }

  return (
    <div
      className="space-y-3 animatedBackgroundmt-5 overflow-hidden border-b "
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-white-700 font-medium">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: '0px' }}
      >
        <div>
          <p className="text-white-500">{faqsList.a}</p>
        </div>
      </div>
    </div>
  )
}

export default () => {
  const faqsList = [
    {
      q: 'Quelles sont quelques questions aléatoires à poser ?',
      a: "C'est exactement la raison pour laquelle nous avons créé ce générateur de questions aléatoires. Il y a des centaines de questions aléatoires parmi lesquelles choisir afin que vous puissiez trouver la question aléatoire parfaite.",
    },
    {
      q: 'Incluez-vous des questions courantes ?',
      a: "Ce générateur ne comprend pas les questions les plus courantes. L'idée est que vous pouvez trouver vous-même les questions courantes, donc la plupart des questions dans ce générateur sont différentes.",
    },
    {
      q: 'Puis-je utiliser cela pour 21 questions ?',
      a: "Oui ! Il y a deux façons d'utiliser ce générateur de questions en fonction de ce que vous recherchez. Vous pouvez indiquer que vous souhaitez générer 21 questions.",
    },
    {
      q: 'Ces questions sont-elles destinées aux filles ou aux garçons ?',
      a: 'Les questions de ce générateur sont neutres en termes de genre et peuvent être posées à des hommes ou des femmes (ou à toute autre personne identifiant avec un autre genre).',
    },
    {
      q: "Qu'est-ce que vous aimeriez faire avec plus de talent ?",
      a: "Si vous cherchez un moyen d'obtenir des questions aléatoires, vous êtes au bon endroit. Nous avons créé le générateur de questions aléatoires pour vous poser autant de questions aléatoires que vous le souhaitez.",
    },
  ]

  return (
    <section className="relative leading-relaxed  text-white mx-auto px-4 md:px-8 animatedBackground pb-6">
      <div
        className="absolute top-16 inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px] z-0"
        style={{
          background:
            'linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)',
        }}
      ></div>
      {/* Contenu de la section */}
      <div className="space-y-3 text-center z-10 relative">
        <h1 className="text-3xl text-white-800 pt-4  font-semibold">
          Questions fréquemment posées
        </h1>
        <p className="text-white-600 max-w-lg mx-auto text-lg">
          Toutes les questions fréquemment posées ont été répondues, vous êtes
          toujours confus ? N'hésitez pas à nous contacter.
        </p>
      </div>

      <div className="mt-14 max-w-2xl mx-auto text-white z-10 relative">
        {faqsList.map((item, idx) => (
          <FaqsCard idx={idx} faqsList={item} className="text-white" key={idx} />
        ))}
      </div>
    </section>
  )
}
