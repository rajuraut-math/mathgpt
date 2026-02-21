import React from 'react'

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
)

const PenIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
)

const SubtopicCard = ({ subtopic, grade, onLearn, onPractice }) => {
  const showFormativeTag = (grade === 11 || grade === 12) && subtopic.isFormativeOnly

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <span className="font-medium text-slate-800 text-sm leading-snug">{subtopic.name}</span>
        </div>

        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {showFormativeTag ? (
            <span className="group relative inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-full cursor-help">
              <InfoIcon />
              Not in Board Exam
              <span className="hidden group-hover:block absolute bottom-full left-0 mb-1 w-52 bg-slate-800 text-white text-xs rounded-xl p-2.5 pointer-events-none z-10 shadow-lg">
                This subtopic is assessed in formative/internal tests only — not in the CBSE Board Exam.
              </span>
            </span>
          ) : (
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              Board Exam
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <button
          onClick={() => onLearn(subtopic)}
          className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          <BookOpenIcon />
          Learn
        </button>
        <button
          onClick={() => onPractice(subtopic)}
          className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
        >
          <PenIcon />
          Practice
        </button>
      </div>
    </div>
  )
}

const SubtopicList = ({ chapter, grade, onLearn, onPractice }) => {
  if (!chapter) return null

  const boardSubtopics = chapter.subtopics.filter(s => !s.isFormativeOnly)
  const formativeSubtopics = chapter.subtopics.filter(s => s.isFormativeOnly)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{chapter.name}</h1>
        <p className="text-slate-500 text-sm mt-1">
          {chapter.subtopics.length} subtopics
          {formativeSubtopics.length > 0 && ` · ${formativeSubtopics.length} formative only`}
        </p>
      </div>

      {/* Board exam subtopics */}
      {boardSubtopics.length > 0 && (
        <div className="mb-5">
          {formativeSubtopics.length > 0 && (
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Board Exam Topics
            </h2>
          )}
          <div className="flex flex-col gap-3">
            {boardSubtopics.map((subtopic, i) => (
              <SubtopicCard
                key={i}
                subtopic={subtopic}
                grade={grade}
                onLearn={onLearn}
                onPractice={onPractice}
              />
            ))}
          </div>
        </div>
      )}

      {/* Formative-only subtopics */}
      {formativeSubtopics.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Formative Only (Internal Assessment)
          </h2>
          <div className="flex flex-col gap-3">
            {formativeSubtopics.map((subtopic, i) => (
              <SubtopicCard
                key={i}
                subtopic={subtopic}
                grade={grade}
                onLearn={onLearn}
                onPractice={onPractice}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SubtopicList
