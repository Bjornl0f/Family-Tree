import mongoose from "mongoose";

const isDateInPast = (value) => {
  const currentDate = new Date();
  return value <= currentDate;
};

const personSchema = new mongoose.Schema(
  {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        validate: {
            validator: function (value) {
              return ['male', 'female'].includes(value.toLowerCase());
            },
            message: props => `${props.value} is not a valid gender. Use 'male' or 'female'.`,
          },
        required: true,
      },
      birthDate: {
        type: Date,
        validate: [
            {
              validator: function (value) {
                return isDateInPast(value);
              },
              message: props => 'Birth date must not be in the future.',
            },
        ],
        required: true,
      },
      deathDate: {
        type: Date,
        validate: [
            {
              validator: function (value) {
                return isDateInPast(value);
              },
              message: props => 'Death date must not be in the future.',
            },
        ],
      },
      birthPlace: {
        country: {
          type: String,
          required: true,
        },
        city: String,
      },
      deathPlace: {
        country: String,
        city: String,
      },
      photo: {
        type: String,
      },
      relations: [
        {
          type: { type: String, enum: ['parent', 'sibling', 'child', 'spouse'] },
          person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' }
        }
      ]
  },
  
  {
      timestamps: true,
  }
);

personSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

personSchema.virtual('age').get(function () {
  const birthYear = this.birthDate.getFullYear();
  const thisYear = this.deathDate?.getFullYear() || new Date().getFullYear();
  let age = thisYear - birthYear;
  const hasBirthdayOccurred =
    thisYear.getMonth() > birthDate.getMonth() ||
    (thisYear.getMonth() === birthDate.getMonth() && thisYear.getDate() >= birthDate.getDate());

  if (!hasBirthdayOccurred) {
      age--;
  }
  return age;
});

export const Person = mongoose.model('person', personSchema);