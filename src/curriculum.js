/**
 * MathGPT Curriculum Data — CBSE Grades 9–12
 * Structure: CURRICULUM[grade][mathType] = Array of chapters
 * mathType: 'standard' for grades 9/10; 'standard' or 'applied' for 11/12
 */

const s = (name, isFormativeOnly = false) => ({ name, isFormativeOnly })

export const CURRICULUM = {
  9: {
    standard: [
      {
        id: 'g9-std-c1',
        name: 'Coordinate Geometry',
        subtopics: [
          s('Cartesian coordinate system'),
          s('Distance between two points'),
          s('Midpoint of a line segment'),
          s('Collinearity of points'),
          s('Coordinate plane applications'),
        ],
      },
      {
        id: 'g9-std-c2',
        name: 'Introduction to Polynomials',
        subtopics: [
          s('Algebraic expressions and polynomials'),
          s('Degree, terms and coefficients'),
          s('Linear polynomials and applications'),
          s('Slope and y-intercept'),
          s('Graphing linear equations'),
        ],
      },
      {
        id: 'g9-std-c3',
        name: 'Number Systems',
        subtopics: [
          s('Rational numbers and number line'),
          s('Density of rational numbers'),
          s('Irrational numbers and proofs'),
          s('Square root spiral'),
          s('Decimal expansions'),
        ],
      },
      {
        id: 'g9-std-c4',
        name: "Introduction to Euclid's Geometry",
        subtopics: [
          s('History of geometry'),
          s("Euclid's definitions and axioms"),
          s('The 5 postulates'),
          s('Parallelism of lines'),
        ],
      },
      {
        id: 'g9-std-c5',
        name: 'Lines and Angles',
        subtopics: [
          s('Rays and angle types'),
          s('Linear pair theorem'),
          s('Vertically opposite angles'),
          s('Parallel lines and transversal'),
          s('Angle sum properties'),
        ],
      },
      {
        id: 'g9-std-c6',
        name: 'Sequences and Progressions',
        subtopics: [
          s('Introduction to sequences'),
          s('Arithmetic Progressions'),
          s('Sum of first n natural numbers'),
          s('Geometric Progressions'),
          s('Applications of GP and fractals'),
        ],
      },
      {
        id: 'g9-std-c7',
        name: 'Triangles: Congruence Theorems',
        subtopics: [
          s('Triangle rigidity'),
          s('SAS and ASA congruence'),
          s('SSS and RHS congruence'),
          s('AAS congruence'),
          s('Isosceles triangle properties'),
          s('Why SSA fails'),
        ],
      },
      {
        id: 'g9-std-c8',
        name: 'Mensuration: Area and Perimeter',
        subtopics: [
          s('Perimeter and circle circumference'),
          s('Arc length and sector area'),
          s('Area of rectangles and parallelograms'),
          s("Heron's formula"),
          s("Brahmagupta's formula"),
        ],
      },
      {
        id: 'g9-std-c9',
        name: 'Exploring Algebraic Identities',
        subtopics: [
          s('Visualising identities geometrically'),
          s('Factorization using identities'),
          s('Quadratic expression factorization'),
          s('Simplifying rational expressions'),
        ],
      },
      {
        id: 'g9-std-c10',
        name: 'Quadrilaterals',
        subtopics: [
          s('Properties of parallelograms'),
          s('Midpoint theorem'),
          s('Central and reflection symmetry'),
          s('Tiling with quadrilaterals'),
        ],
      },
      {
        id: 'g9-std-c11',
        name: 'Circles',
        subtopics: [
          s('Chord, diameter, radius, arc definitions'),
          s('Perpendicular from centre to chord'),
          s('Angle at centre vs circumference'),
          s('Angles in same segment'),
          s('Cyclic quadrilaterals'),
        ],
      },
      {
        id: 'g9-std-c12',
        name: 'Linear Equations in Two Variables',
        subtopics: [
          s('Graphical representation of equations'),
          s('Nature of solutions'),
          s('Substitution method'),
          s('Elimination method'),
          s('Real-life modelling'),
        ],
      },
      {
        id: 'g9-std-c13',
        name: 'Mensuration: Surface Area and Volume',
        subtopics: [
          s('Surface area of cuboids and cubes'),
          s('Surface area of cylinders and cones'),
          s('Volume of cuboids and cylinders'),
          s('Volume of cones and spheres'),
          s('Hemispheres'),
        ],
      },
      {
        id: 'g9-std-c14',
        name: 'Statistics',
        subtopics: [
          s('Organizing and representing data'),
          s('Mean of data'),
          s('Median of data'),
          s('Mode of data'),
          s('Weighted average'),
        ],
      },
      {
        id: 'g9-std-c15',
        name: 'Introduction to Probability',
        subtopics: [
          s('Probability scale and randomness'),
          s('Empirical probability'),
          s('Theoretical probability'),
          s('Sample space and events'),
          s('Tree diagrams'),
        ],
      },
    ],
  },

  10: {
    standard: [
      {
        id: 'g10-std-c1',
        name: 'Real Numbers',
        subtopics: [
          s('Fundamental Theorem of Arithmetic'),
          s('Proving irrationality of √2, √3, √5'),
          s('HCF and LCM using prime factorization'),
        ],
      },
      {
        id: 'g10-std-c2',
        name: 'Polynomials',
        subtopics: [
          s('Zeros of a polynomial'),
          s('Relationship between zeros and coefficients'),
          s('Graphical meaning of zeros'),
        ],
      },
      {
        id: 'g10-std-c3',
        name: 'Pair of Linear Equations in Two Variables',
        subtopics: [
          s('Graphical method of solution'),
          s('Consistency and inconsistency'),
          s('Substitution method'),
          s('Elimination method'),
          s('Real-life word problems'),
        ],
      },
      {
        id: 'g10-std-c4',
        name: 'Quadratic Equations',
        subtopics: [
          s('Standard form of quadratic equation'),
          s('Solving by factorization'),
          s('Solving by quadratic formula'),
          s('Discriminant and nature of roots'),
          s('Real-life applications'),
        ],
      },
      {
        id: 'g10-std-c5',
        name: 'Arithmetic Progressions',
        subtopics: [
          s('Introduction and identification of AP'),
          s('nth term formula'),
          s('Sum of first n terms'),
          s('Real-life applications of AP'),
        ],
      },
      {
        id: 'g10-std-c6',
        name: 'Coordinate Geometry',
        subtopics: [
          s('Distance formula'),
          s('Section formula — internal division'),
          s('Midpoint formula'),
        ],
      },
      {
        id: 'g10-std-c7',
        name: 'Triangles',
        subtopics: [
          s('Basic Proportionality Theorem and converse'),
          s('Similarity criteria — AA, SSS, SAS'),
          s('Areas of similar triangles'),
          s('Pythagoras theorem and converse'),
        ],
      },
      {
        id: 'g10-std-c8',
        name: 'Circles',
        subtopics: [
          s('Tangent to a circle'),
          s('Tangent perpendicular to radius — proof'),
          s('Equal tangents from external point — proof'),
          s('Problems on tangents'),
        ],
      },
      {
        id: 'g10-std-c9',
        name: 'Introduction to Trigonometry',
        subtopics: [
          s('Trigonometric ratios — definition'),
          s('Ratios of 30°, 45°, 60°'),
          s('Trigonometric ratios of 0° and 90°'),
          s('Relationships between ratios'),
        ],
      },
      {
        id: 'g10-std-c10',
        name: 'Trigonometric Identities',
        subtopics: [
          s('Proof of sin²A + cos²A = 1'),
          s('Deriving other identities'),
          s('Proving identity-based problems'),
        ],
      },
      {
        id: 'g10-std-c11',
        name: 'Heights and Distances',
        subtopics: [
          s('Angle of elevation'),
          s('Angle of depression'),
          s('Problems with one right triangle'),
          s('Problems with two right triangles'),
        ],
      },
      {
        id: 'g10-std-c12',
        name: 'Areas Related to Circles',
        subtopics: [
          s('Area of sector'),
          s('Area of segment'),
          s('Combined area problems'),
        ],
      },
      {
        id: 'g10-std-c13',
        name: 'Surface Areas and Volumes',
        subtopics: [
          s('Surface area of combinations of solids'),
          s('Volume of combinations of solids'),
          s('Conversion of solids'),
        ],
      },
      {
        id: 'g10-std-c14',
        name: 'Statistics',
        subtopics: [
          s('Mean of grouped data — direct method'),
          s('Mean by assumed mean method'),
          s('Mean by step deviation method'),
          s('Median of grouped data'),
          s('Mode of grouped data'),
        ],
      },
      {
        id: 'g10-std-c15',
        name: 'Probability',
        subtopics: [
          s('Classical definition of probability'),
          s('Complementary events'),
          s('Simple probability problems'),
          s('Real-life probability'),
        ],
      },
    ],
  },

  11: {
    standard: [
      {
        id: 'g11-std-c1',
        name: 'Sets',
        subtopics: [
          s('Representation of sets'),
          s('Types of sets'),
          s('Subsets and power sets'),
          s('Venn diagrams'),
          s('Union and intersection'),
          s('Difference and complement'),
          s('Properties of complement'),
          s('Practical problems on union and intersection', true),
        ],
      },
      {
        id: 'g11-std-c2',
        name: 'Relations and Functions',
        subtopics: [
          s('Ordered pairs and Cartesian product'),
          s('Definition of relation, domain and range'),
          s('Functions and their types'),
          s('Real valued functions and their graphs'),
          s('Sum, difference, product, quotient of functions'),
          s('Composition of functions', true),
        ],
      },
      {
        id: 'g11-std-c3',
        name: 'Trigonometric Functions',
        subtopics: [
          s('Angles in radians and degrees'),
          s('Trigonometric functions via unit circle'),
          s('Domain, range and graphs'),
          s('sin and cos of sum and difference angles'),
          s('Identities for sin 2x, cos 2x, tan 2x'),
          s('General solutions of trigonometric equations', true),
        ],
      },
      {
        id: 'g11-std-c4',
        name: 'Complex Numbers and Quadratic Equations',
        subtopics: [
          s('Need for complex numbers'),
          s('Algebraic properties of complex numbers'),
          s('Argand plane representation'),
          s('Quadratic equations with complex roots'),
          s('Polar representation', true),
          s('Fundamental theorem of algebra', true),
        ],
      },
      {
        id: 'g11-std-c5',
        name: 'Linear Inequalities',
        subtopics: [
          s('Algebraic solutions in one variable'),
          s('Number line representation'),
          s('Simple word problems'),
          s('Graphical solution in two variables', true),
        ],
      },
      {
        id: 'g11-std-c6',
        name: 'Permutations and Combinations',
        subtopics: [
          s('Fundamental principle of counting'),
          s('Factorial notation'),
          s('Permutations — nPr'),
          s('Combinations — nCr'),
          s('Applications and word problems'),
        ],
      },
      {
        id: 'g11-std-c7',
        name: 'Binomial Theorem',
        subtopics: [
          s('Statement of binomial theorem'),
          s('Proof for positive integral indices'),
          s("Pascal's triangle"),
          s('Simple applications'),
          s('General term and middle term', true),
        ],
      },
      {
        id: 'g11-std-c8',
        name: 'Sequence and Series',
        subtopics: [
          s('Arithmetic Progression and AM'),
          s('Geometric Progression and GM'),
          s('Sum of n terms of GP'),
          s('Infinite GP'),
          s('Relation between AM and GM'),
          s('Special sums (Σk, Σk², Σk³)', true),
        ],
      },
      {
        id: 'g11-std-c9',
        name: 'Straight Lines',
        subtopics: [
          s('Slope of a line'),
          s('Point-slope form'),
          s('Slope-intercept form'),
          s('Two-point form'),
          s('Intercept form'),
          s('Distance of point from line'),
          s('Normal form and general equation', true),
        ],
      },
      {
        id: 'g11-std-c10',
        name: 'Conic Sections',
        subtopics: [
          s('Circle — standard equation'),
          s('Parabola — standard equation and properties'),
          s('Ellipse — standard equation and properties'),
          s('Hyperbola — standard equation and properties'),
        ],
      },
      {
        id: 'g11-std-c11',
        name: 'Introduction to 3D Geometry',
        subtopics: [
          s('Coordinate axes and planes in 3D'),
          s('Coordinates of a point in 3D'),
          s('Distance between two points in 3D'),
          s('Section formula in 3D', true),
        ],
      },
      {
        id: 'g11-std-c12',
        name: 'Limits and Derivatives',
        subtopics: [
          s('Intuitive idea of limits'),
          s('Limits of polynomial and rational functions'),
          s('Limits of trigonometric functions'),
          s('Definition of derivative'),
          s('Derivatives of sum, difference, product, quotient'),
          s('Chain rule for composite functions', true),
        ],
      },
      {
        id: 'g11-std-c13',
        name: 'Statistics',
        subtopics: [
          s('Range and mean deviation'),
          s('Variance and standard deviation of ungrouped data'),
          s('Variance and standard deviation of grouped data'),
        ],
      },
      {
        id: 'g11-std-c14',
        name: 'Probability',
        subtopics: [
          s('Random experiments and events'),
          s('Mutually exclusive and exhaustive events'),
          s('Axiomatic probability'),
          s('Probability of NOT and OR events'),
        ],
      },
    ],

    applied: [
      {
        id: 'g11-app-c1',
        name: 'Numbers and Quantification',
        subtopics: [
          s('Binary numbers and conversion'),
          s('Indices and logarithm'),
          s('Laws and properties of logarithm'),
          s('Antilogarithm and applications'),
        ],
      },
      {
        id: 'g11-app-c2',
        name: 'Numerical Applications',
        subtopics: [
          s('Clock problems'),
          s('Calendar and odd days'),
          s('Time, work and distance'),
          s('Seating arrangements — linear and circular'),
        ],
      },
      {
        id: 'g11-app-c3',
        name: 'Sets',
        subtopics: [
          s('Definition and representation of sets'),
          s('Types of sets'),
          s('Subsets and intervals'),
          s('Venn diagrams'),
          s('Operations on sets — union, intersection, difference, complement'),
        ],
      },
      {
        id: 'g11-app-c4',
        name: 'Relations',
        subtopics: [
          s('Ordered pairs'),
          s('Cartesian product of sets'),
          s('Definition and examples of relations'),
          s('Domain and range'),
        ],
      },
      {
        id: 'g11-app-c5',
        name: 'Sequences and Series',
        subtopics: [
          s('AP — nth term and sum'),
          s('Geometric mean'),
          s('AM–GM relation'),
          s('Applications of AP and GP (economy stimulation, virus spread)'),
        ],
      },
      {
        id: 'g11-app-c6',
        name: 'Permutations and Combinations',
        subtopics: [
          s('Factorial'),
          s('Fundamental principle of counting'),
          s('Permutations — nPr'),
          s('Combinations — nCr'),
        ],
      },
      {
        id: 'g11-app-c7',
        name: 'Logical Reasoning',
        subtopics: [
          s('Odd man out'),
          s('Syllogism'),
          s('Blood relations'),
          s('Coding and decoding'),
        ],
      },
      {
        id: 'g11-app-c8',
        name: 'Functions',
        subtopics: [
          s('Dependent and independent variables'),
          s('Domain, range and codomain'),
          s('Types of functions and their graphs'),
          s('Constant, identity, polynomial, rational, modulus, exponential, logarithmic functions'),
        ],
      },
      {
        id: 'g11-app-c9',
        name: 'Limits and Continuity',
        subtopics: [
          s('Left hand and right hand limits'),
          s('Limit of a function'),
          s('Continuity of a function'),
        ],
      },
      {
        id: 'g11-app-c10',
        name: 'Differentiation',
        subtopics: [
          s('Derivatives of algebraic functions'),
          s('Chain rule for function of a function (non-trigonometric)'),
        ],
      },
      {
        id: 'g11-app-c11',
        name: 'Probability',
        subtopics: [
          s('Random experiments and sample space'),
          s('Types of events'),
          s('Conditional probability'),
        ],
      },
      {
        id: 'g11-app-c12',
        name: 'Descriptive Statistics',
        subtopics: [
          s('Measures of dispersion — range and quartile deviation'),
          s('Mean deviation and standard deviation'),
          s('Percentile rank'),
          s("Spearman's rank correlation"),
        ],
      },
      {
        id: 'g11-app-c13',
        name: 'Financial Mathematics',
        subtopics: [
          s('Simple and compound interest'),
          s('Interest rates and equivalency'),
          s('Annuities and types'),
          s('Tax, GST and income tax basics'),
          s('Electricity and utility bill calculations'),
        ],
      },
      {
        id: 'g11-app-c14',
        name: 'Coordinate Geometry',
        subtopics: [
          s('Straight line equations — all forms'),
          s('Circle equations'),
          s('Parabola — definition and standard form'),
        ],
      },
    ],
  },

  12: {
    standard: [
      {
        id: 'g12-std-c1',
        name: 'Relations and Functions',
        subtopics: [
          s('Types of relations — reflexive, symmetric, transitive, equivalence'),
          s('One-one and onto functions'),
          s('Composition of functions'),
        ],
      },
      {
        id: 'g12-std-c2',
        name: 'Inverse Trigonometric Functions',
        subtopics: [
          s('Definition and principal value branch'),
          s('Domain and range'),
          s('Graphs of inverse trig functions'),
          s('Properties and identities'),
        ],
      },
      {
        id: 'g12-std-c3',
        name: 'Matrices',
        subtopics: [
          s('Types and notation of matrices'),
          s('Matrix operations — addition and multiplication'),
          s('Scalar multiplication'),
          s('Transpose, symmetric and skew symmetric'),
          s('Invertible matrices and inverse'),
        ],
      },
      {
        id: 'g12-std-c4',
        name: 'Determinants',
        subtopics: [
          s('Determinant of 2×2 and 3×3 matrices'),
          s('Minors and cofactors'),
          s('Area of triangle using determinant'),
          s('Adjoint and inverse of matrix'),
          s('System of linear equations using inverse'),
        ],
      },
      {
        id: 'g12-std-c5',
        name: 'Continuity and Differentiability',
        subtopics: [
          s('Continuity of a function'),
          s('Chain rule and composite functions'),
          s('Derivatives of inverse trig functions'),
          s('Implicit differentiation'),
          s('Exponential and logarithmic derivatives'),
          s('Parametric functions'),
          s('Second order derivatives'),
        ],
      },
      {
        id: 'g12-std-c6',
        name: 'Applications of Derivatives',
        subtopics: [
          s('Rate of change of quantities'),
          s('Increasing and decreasing functions'),
          s('First derivative test for maxima/minima'),
          s('Second derivative test'),
          s('Real-life optimization problems'),
        ],
      },
      {
        id: 'g12-std-c7',
        name: 'Integrals',
        subtopics: [
          s('Integration as inverse of differentiation'),
          s('Integration by substitution'),
          s('Integration by partial fractions'),
          s('Integration by parts'),
          s('Standard integral forms'),
          s('Fundamental theorem of calculus'),
          s('Definite integrals and properties'),
        ],
      },
      {
        id: 'g12-std-c8',
        name: 'Applications of Integrals',
        subtopics: [
          s('Area under a curve'),
          s('Area between two curves'),
          s('Area of circles, parabolas, ellipses in standard form'),
        ],
      },
      {
        id: 'g12-std-c9',
        name: 'Differential Equations',
        subtopics: [
          s('Order and degree of differential equations'),
          s('General and particular solutions'),
          s('Variable separable method'),
          s('Homogeneous differential equations'),
          s('Linear differential equations'),
        ],
      },
      {
        id: 'g12-std-c10',
        name: 'Vectors',
        subtopics: [
          s('Types of vectors and magnitude'),
          s('Direction cosines and ratios'),
          s('Addition and scalar multiplication'),
          s('Dot product and applications'),
          s('Cross product and applications'),
        ],
      },
      {
        id: 'g12-std-c11',
        name: 'Three Dimensional Geometry',
        subtopics: [
          s('Direction cosines and ratios of a line'),
          s('Cartesian and vector equation of a line'),
          s('Skew lines and shortest distance'),
          s('Angle between two lines'),
        ],
      },
      {
        id: 'g12-std-c12',
        name: 'Linear Programming',
        subtopics: [
          s('Formulating LPP'),
          s('Graphical method of solution'),
          s('Feasible and infeasible regions'),
          s('Optimal feasible solution'),
          s('Types of LPP problems'),
        ],
      },
      {
        id: 'g12-std-c13',
        name: 'Probability',
        subtopics: [
          s('Conditional probability'),
          s('Multiplication theorem'),
          s('Independent events'),
          s("Bayes' theorem"),
          s('Total probability theorem'),
        ],
      },
    ],

    applied: [
      {
        id: 'g12-app-c1',
        name: 'Numbers, Quantification and Numerical Applications',
        subtopics: [
          s('Modulo arithmetic'),
          s('Congruence modulo'),
          s('Alligation and mixture'),
          s('Boats and streams'),
          s('Pipes and cisterns'),
          s('Races and games'),
          s('Numerical inequalities'),
        ],
      },
      {
        id: 'g12-app-c2',
        name: 'Matrices',
        subtopics: [
          s('Types of matrices'),
          s('Equality, transpose, symmetric, skew symmetric'),
          s('Algebra of matrices — addition, subtraction, multiplication'),
          s('Determinants'),
          s('Inverse of a matrix'),
          s("Solving simultaneous equations using Cramer's rule and matrix inverse"),
        ],
      },
      {
        id: 'g12-app-c3',
        name: 'Calculus — Differentiation',
        subtopics: [
          s('Derivatives up to second order'),
          s('Parametric and implicit differentiation'),
          s('Rate of change applications'),
          s('Marginal cost and marginal revenue'),
          s('Increasing and decreasing functions'),
          s('Maxima and minima with optimization'),
        ],
      },
      {
        id: 'g12-app-c4',
        name: 'Calculus — Integration',
        subtopics: [
          s('Indefinite integrals by substitution'),
          s('Indefinite integrals by partial fractions'),
          s('Indefinite integrals by parts'),
          s('Definite integrals as area under curve'),
          s('Consumer surplus and producer surplus'),
          s('Total cost and revenue from marginal functions'),
        ],
      },
      {
        id: 'g12-app-c5',
        name: 'Differential Equations',
        subtopics: [
          s('Definition, order and degree'),
          s('Formulating differential equations'),
          s('Solving by variable separable method'),
        ],
      },
      {
        id: 'g12-app-c6',
        name: 'Probability Distributions',
        subtopics: [
          s('Discrete and continuous random variables'),
          s('Mathematical expectation'),
          s('Variance and standard deviation of random variable'),
          s('Binomial distribution — mean, variance, SD'),
          s('Poisson distribution'),
          s('Normal distribution and standard normal variate'),
        ],
      },
      {
        id: 'g12-app-c7',
        name: 'Inferential Statistics',
        subtopics: [
          s('Population and sample'),
          s('Representative sampling methods'),
          s('Parameter vs statistic'),
          s('Central limit theorem — conceptual'),
          s('t-Test for one group'),
        ],
      },
      {
        id: 'g12-app-c8',
        name: 'Time Series',
        subtopics: [
          s('Meaning and components of time series'),
          s('Secular trend'),
          s('Moving average method'),
          s('Method of least squares'),
        ],
      },
      {
        id: 'g12-app-c9',
        name: 'Financial Mathematics',
        subtopics: [
          s('Perpetuity and sinking funds'),
          s('Bond valuation using present value'),
          s('EMI calculation — flat rate and reducing balance'),
          s('Compound annual growth rate'),
          s('Linear method of depreciation'),
        ],
      },
      {
        id: 'g12-app-c10',
        name: 'Linear Programming',
        subtopics: [
          s('Introduction and terminology'),
          s('Mathematical formulation of LPP'),
          s('Types of LPP — manufacturing, diet'),
          s('Graphical method — corner point method'),
          s('Feasible, infeasible, bounded, unbounded regions'),
        ],
      },
    ],
  },
}

/**
 * Get chapters for a given grade and math type.
 */
export const getChapters = (grade, mathType) => {
  const gradeData = CURRICULUM[grade]
  if (!gradeData) return []
  return gradeData[mathType] || gradeData['standard'] || []
}
